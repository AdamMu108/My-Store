import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay, throwError } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsRequest$?: Observable<Product[]>;

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    if (!this.productsRequest$) {
      this.productsRequest$ = this.http.get<Product[]>('/data.json').pipe(
        shareReplay(1)
      );
    }

    return this.productsRequest$;
  }

  getProductById(id: number): Observable<Product> {
    return this.getProducts().pipe(
      map(products => {
        const product = products.find(item => item.id === id);
        if (!product) {
          throw new Error('Product not found');
        }
        return product;
      })
    );
  }
}
