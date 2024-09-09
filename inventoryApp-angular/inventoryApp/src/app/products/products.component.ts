import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../_services/products.service';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';  // Optional for pagination
import { MatSort, MatSortModule } from '@angular/material/sort';
import { RouterLink } from '@angular/router';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule, MatTableModule, MatSortModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})

export class ProductsComponent implements OnInit{
  displayedColumns: string[] = ['title', 'description', 'quantity', 'unitPrice', 'supplierName', 'warehouseName'];
  dataSource = new MatTableDataSource<Product>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //DI in constructor; private or public doesn't make any difference
  constructor(private productService: ProductsService){}
  
  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}