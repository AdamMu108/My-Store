import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './app-header.html',
  styleUrl: './app-header.css',
})
export class AppHeader {
  @Input() cartItemCount: number = 0;
  @Output() navigate = new EventEmitter<string>();

  goToProducts(): void {
    this.navigate.emit('/products');
  }

  goToCart(): void {
    this.navigate.emit('/cart');
  }
}
