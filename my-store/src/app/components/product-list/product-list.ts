import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit {
  products: Product[] = [];
  cartMessage: string = '';
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const resolvedProducts = this.route.snapshot.data['products'] as Product[] | undefined;

    if (resolvedProducts && resolvedProducts.length > 0) {
      this.products = resolvedProducts;
      this.isLoading = false;
      return;
    }

    this.errorMessage = 'Unable to load products right now.';
    this.isLoading = false;
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product, 1);
    this.cartMessage = `${product.name} added to cart!`;
    setTimeout(() => {
      this.cartMessage = '';
    }, 3000);
  }
}

