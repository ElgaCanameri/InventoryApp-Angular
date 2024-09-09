import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Stock } from '../models/stocks.model';
@Injectable({
  providedIn: 'root'
})
export class StocksService {
  private http = inject(HttpClient)
  baseUrl = 'https://localhost:7223/api';

  getAllStockMovements() {
    return this.http.get<Stock[]>(`${this.baseUrl}/Stock/getAllStockMovements`);
  }
}
