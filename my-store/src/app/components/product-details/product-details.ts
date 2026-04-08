import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit {
  product: Product | null = null;
  quantity: number = 1;
  cartMessage: string = '';
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const resolvedProduct = this.route.snapshot.data['product'] as Product | undefined;

    if (resolvedProduct) {
      this.product = resolvedProduct;
      this.isLoading = false;
      return;
    }

    this.errorMessage = 'Unable to load product details right now.';
    this.isLoading = false;
  }

  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart(this.product, this.quantity);
      this.cartMessage = `${this.product.name} added to cart!`;
      setTimeout(() => {
        this.cartMessage = '';
      }, 3000);
    }
  }

  onQuantityChange(value: number | string): void {
    const parsedQuantity = Number(value);
    this.quantity = Number.isFinite(parsedQuantity) && parsedQuantity > 0 ? parsedQuantity : 1;
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }
}

