import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartItem } from '../../models/cart-item';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit, OnDestroy {
  cartItems: CartItem[] = [];
  total: number = 0;
  cartMessage: string = '';
  private messageTimer?: ReturnType<typeof setTimeout>;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.getCart().subscribe((items: CartItem[]) => {
      this.cartItems = items;
      this.updateTotal();
    });
  }

  updateTotal(): void {
    this.total = this.cartService.getCartTotal();
  }

  updateQuantity(productId: number, quantity: number): void {
    const itemToUpdate = this.cartItems.find(item => item.product.id === productId);

    if (quantity > 0 && itemToUpdate && quantity !== itemToUpdate.quantity) {
      this.cartService.updateQuantity(productId, quantity);
      this.showCartMessage(`${itemToUpdate.product.name} quantity updated to ${quantity}.`);
    }
  }

  removeItem(productId: number): void {
    const itemToRemove = this.cartItems.find(item => item.product.id === productId);
    this.cartService.removeFromCart(productId);
    if (itemToRemove) {
      this.showCartMessage(`${itemToRemove.product.name} removed from cart.`);
    }
  }

  ngOnDestroy(): void {
    if (this.messageTimer) {
      clearTimeout(this.messageTimer);
    }
  }

  private showCartMessage(message: string): void {
    this.cartMessage = message;

    if (this.messageTimer) {
      clearTimeout(this.messageTimer);
    }

    this.messageTimer = setTimeout(() => {
      this.cartMessage = '';
      this.messageTimer = undefined;
    }, 3500);
  }

  continueShopping(): void {
    this.router.navigate(['/products']);
  }

  checkout(): void {
    if (this.cartItems.length > 0) {
      this.router.navigate(['/checkout']);
    }
  }
}

