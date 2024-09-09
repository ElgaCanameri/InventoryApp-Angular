import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Supplier } from '../models/supplier.model';
import { SupplierAddModel } from '../models/supplier-add.model';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private http = inject(HttpClient)
  baseUrl = 'https://localhost:7223/api';

  getAllSuppliers() {
    return this.http.get<Supplier[]>(`${this.baseUrl}/Supplier`);
  }

  createSupplier(model: SupplierAddModel){
    return this.http.post<any>(`${this.baseUrl}/Supplier`, model)
  }
}
