import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';  // Optional for pagination
import { MatSort, MatSortModule } from '@angular/material/sort';
import { RouterLink } from '@angular/router';
import { OrderService } from '../_services/order.service';
import { Order } from '../models/orders.model';

export interface OrderItem {
  customerId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
}

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatTableModule, MatSortModule, RouterLink, MatPaginatorModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit{
 
  displayedColumns: string[] = ['productName', 'quantity', 'unitPrice','customerId'];
  dataSource = new MatTableDataSource<OrderItem>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe(orders => {
      console.log('Orders data:', orders);
      const flattenedOrders = this.flattenOrders(orders);
      this.dataSource.data = flattenedOrders;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  private flattenOrders(orders: Order[]): OrderItem[] {
    return orders.flatMap(order =>
      order.items.map(item => ({
        customerId: order.customerId,
        productName: item.productName,
        quantity: item.quantity,
        unitPrice: item.unitPrice
      }))
    );
  }

  
}