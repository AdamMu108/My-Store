import { Component, OnInit } from '@angular/core';
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
export class Cart implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;

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
    if (quantity > 0) {
      this.cartService.updateQuantity(productId, quantity);
    }
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
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

