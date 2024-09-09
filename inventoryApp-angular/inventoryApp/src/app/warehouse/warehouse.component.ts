import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';  // Optional for pagination
import { MatSort, MatSortModule } from '@angular/material/sort';
import { RouterLink } from '@angular/router';
import { Warehouse } from '../models/warehouse.model';
import { WarehousesService } from '../_services/warehouses.service';
@Component({
  selector: 'app-warehouse',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule, MatTableModule, MatSortModule, RouterLink],
  templateUrl: './warehouse.component.html',
  styleUrl: './warehouse.component.css'
})
export class WarehouseComponent implements OnInit{
  displayedColumns: string[] = ['name', 'location'];
  dataSource = new MatTableDataSource<Warehouse>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private warehouseService : WarehousesService){}
  
  ngOnInit(): void {
    this.warehouseService.getAllWarehouses().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
