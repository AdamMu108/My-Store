import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { filter } from 'rxjs/operators';

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
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (event.urlAfterRedirects === '/products') {
        this.loadProducts();
      }
    });

    setTimeout(() => {
      if (this.router.url === '/products') {
        this.loadProducts();
      }
    }, 0);
  }

  loadProducts(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.productService.getProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.products = [];
        this.isLoading = false;
        this.errorMessage = 'Unable to load products right now.';
      }
    });
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product, 1);
    this.cartMessage = `${product.name} added to cart!`;
    setTimeout(() => {
      this.cartMessage = '';
    }, 3000);
  }
}

