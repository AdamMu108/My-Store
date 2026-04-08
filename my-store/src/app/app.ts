import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from './services/cart.service';
import { CartItem } from './models/cart-item';
import { AppHeader } from './components/app-header/app-header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppHeader],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  cartItemCount = 0;
  private cartSubscription?: Subscription;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartSubscription = this.cartService.getCart().subscribe((items: CartItem[]) => {
      this.cartItemCount = items.reduce((total, item) => total + item.quantity, 0);
    });
  }

  navigate(route: string): void {
    this.router.navigateByUrl(route);
  }
}
