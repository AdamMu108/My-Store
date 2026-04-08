import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';

export const productListResolver: ResolveFn<Product[]> = () => {
  return inject(ProductService).getProducts();
};