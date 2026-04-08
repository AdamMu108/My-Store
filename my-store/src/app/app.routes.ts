import { Routes } from '@angular/router';
import { ProductList } from './components/product-list/product-list';
import { ProductDetails } from './components/product-details/product-details';
import { Cart } from './components/cart/cart';
import { Checkout } from './components/checkout/checkout';
import { OrderConfirmation } from './components/order-confirmation/order-confirmation';
import { productListResolver } from './resolvers/product-list.resolver';
import { productDetailsResolver } from './resolvers/product-details.resolver';

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: ProductList, resolve: { products: productListResolver } },
  { path: 'product/:id', component: ProductDetails, resolve: { product: productDetailsResolver } },
  { path: 'cart', component: Cart },
  { path: 'checkout', component: Checkout },
  { path: 'confirmation', component: OrderConfirmation }
];
