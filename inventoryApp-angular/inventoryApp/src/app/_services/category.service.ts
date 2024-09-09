import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CategoryAddModel } from '../models/category-add.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private http = inject(HttpClient)
  baseUrl = 'https://localhost:7223/api';

  getCategories() {
    return this.http.get<any[]>(`${this.baseUrl}/Category`);
  }
  createCategory(model: CategoryAddModel){
    return this.http.post<any>(`${this.baseUrl}/Category`, model)
  }
}
