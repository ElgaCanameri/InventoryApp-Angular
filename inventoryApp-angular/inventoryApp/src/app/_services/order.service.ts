import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderAddModel } from '../models/order-add.model';
import { Order } from '../models/orders.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
    private http = inject(HttpClient)
    baseUrl = 'https://localhost:7223/api';

    getAllOrders() {
        return this.http.get<Order[]>(`${this.baseUrl}/Order`);
    }

    
      
    createOrder(model: OrderAddModel){
        return this.http.post<any>(`${this.baseUrl}/Order`, model)
    }
     
}