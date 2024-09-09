import { inject, Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';
import { HttpClient } from '@angular/common/http';
import { CustomerAddModel } from '../models/customer-add.model';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  private http = inject(HttpClient)
  baseUrl = 'https://localhost:7223/api';

  getAllCustomers() {
    return this.http.get<Customer[]>(`${this.baseUrl}/Customer`);
  }
  createProduct(model: CustomerAddModel){
    return this.http.post<any>(`${this.baseUrl}/Customer`, model)
  }
}
