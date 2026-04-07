import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-order-confirmation',
  imports: [CommonModule, RouterModule],
  templateUrl: './order-confirmation.html',
  styleUrl: './order-confirmation.css',
})
export class OrderConfirmation implements OnInit {
  orderNumber: string = '';
  orderDate: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.orderNumber = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    this.orderDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  continueShopping(): void {
    this.router.navigate(['/products']);
  }
}

