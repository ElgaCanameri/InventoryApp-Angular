import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Warehouse } from '../models/warehouse.model';
import { WarehouseAddModel } from '../models/warehouse-add.model';
@Injectable({
  providedIn: 'root'
})
export class WarehousesService {

  private http = inject(HttpClient)
  baseUrl = 'https://localhost:7223/api';

  getAllWarehouses() {
    return this.http.get<Warehouse[]>(`${this.baseUrl}/Warehouse`);
  }

  createWarehouse(model: WarehouseAddModel){
    return this.http.post<any>(`${this.baseUrl}/Warehouse`, model)
  }
}
