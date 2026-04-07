import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { filter } from 'rxjs/operators';

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
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (event.urlAfterRedirects.startsWith('/product/')) {
        this.loadProductFromRoute();
      }
    });

    setTimeout(() => {
      this.loadProductFromRoute();
    }, 0);

    this.loadProductFromRoute();
  }

  loadProductFromRoute(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.errorMessage = 'Unable to load product details right now.';
      this.isLoading = false;
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.product = null;

    this.productService.getProductById(id).subscribe({
      next: (product: Product) => {
        this.product = product;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading product:', error);
        this.errorMessage = 'Unable to load product details right now.';
        this.isLoading = false;
      }
    });
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

  goBack(): void {
    this.router.navigate(['/products']);
  }
}

