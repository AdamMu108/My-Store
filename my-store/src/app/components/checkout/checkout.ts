import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';

interface CheckoutForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  cardNumber: string;
  cardExpiry: string;
  cardCVC: string;
}

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout implements OnInit {
  form: CheckoutForm = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: ''
  };

  cartTotal: number = 0;
  errors: { [key: string]: string } = {};
  isSubmitting: boolean = false;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartTotal = this.cartService.getCartTotal();
  }

  validateForm(): boolean {
    this.errors = {};

    if (!this.form.firstName || this.form.firstName.trim().length < 2) {
      this.errors['firstName'] = 'First name must be at least 2 characters';
    }

    if (!this.form.lastName || this.form.lastName.trim().length < 2) {
      this.errors['lastName'] = 'Last name must be at least 2 characters';
    }

    if (!this.form.email || !this.form.email.includes('@')) {
      this.errors['email'] = 'Please enter a valid email';
    }

    if (!this.form.phone || this.form.phone.length < 10) {
      this.errors['phone'] = 'Please enter a valid phone number';
    }

    if (!this.form.address || this.form.address.trim().length < 5) {
      this.errors['address'] = 'Please enter a valid address';
    }

    if (!this.form.city || this.form.city.trim().length < 2) {
      this.errors['city'] = 'Please enter a valid city';
    }

    if (!this.form.state || this.form.state.trim().length < 2) {
      this.errors['state'] = 'Please enter a valid state';
    }

    if (!this.form.zipCode || !/^\d{5}$/.test(this.form.zipCode)) {
      this.errors['zipCode'] = 'Please enter a 5-digit zip code';
    }

    if (!this.form.cardNumber || !/^\d{16}$/.test(this.form.cardNumber.replace(/\s/g, ''))) {
      this.errors['cardNumber'] = 'Please enter a valid 16-digit card number';
    }

    if (!this.form.cardExpiry || !/^\d{2}\/\d{2}$/.test(this.form.cardExpiry)) {
      this.errors['cardExpiry'] = 'Please enter expiry as MM/YY';
    }

    if (!this.form.cardCVC || !/^\d{3}$/.test(this.form.cardCVC)) {
      this.errors['cardCVC'] = 'Please enter a 3-digit CVC';
    }

    return Object.keys(this.errors).length === 0;
  }

  submitForm(): void {
    if (this.validateForm()) {
      this.isSubmitting = true;
      setTimeout(() => {
        this.cartService.clearCart();
        this.router.navigate(['/confirmation']);
      }, 1500);
    }
  }

  cancelCheckout(): void {
    this.router.navigate(['/cart']);
  }
}

