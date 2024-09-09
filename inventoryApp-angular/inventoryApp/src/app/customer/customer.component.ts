import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';  // Optional for pagination
import { MatSort, MatSortModule } from '@angular/material/sort';
import { RouterLink } from '@angular/router';
import { Customer } from '../models/customer.model';
import { CustomersService } from '../_services/customers.service';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule, MatTableModule, MatSortModule, RouterLink],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit{
  displayedColumns: string[] = ['customerName', 'customerAddress'];
  dataSource = new MatTableDataSource<Customer>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private customerService : CustomersService){}
  
  ngOnInit(): void {
    this.customerService.getAllCustomers().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}


