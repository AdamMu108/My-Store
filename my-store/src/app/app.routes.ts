import { Routes } from '@angular/router';
import { ProductList } from './components/product-list/product-list';
import { ProductDetails } from './components/product-details/product-details';
import { Cart } from './components/cart/cart';
import { Checkout } from './components/checkout/checkout';
import { OrderConfirmation } from './components/order-confirmation/order-confirmation';

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: ProductList },
  { path: 'product/:id', component: ProductDetails },
  { path: 'cart', component: Cart },
  { path: 'checkout', component: Checkout },
  { path: 'confirmation', component: OrderConfirmation }
];
