import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductAddModel } from '../models/product-add.model';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';
//makes it injectable, allowing DI
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private http = inject(HttpClient)
  baseUrl = 'https://localhost:7223/api';

  getAllProducts() {
    return this.http.get<Product[]>(`${this.baseUrl}/Product`);
  }
  
  createProduct(model: ProductAddModel){
    return this.http.post<any>(`${this.baseUrl}/Product`, model)
  }
 
  getProductById(id:number){
    return this.http.get<any>(`${this.baseUrl}/Product/${id}`)
  }
  filterProducts(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/Product/filter?categoryId=${categoryId}`);
  }
}
