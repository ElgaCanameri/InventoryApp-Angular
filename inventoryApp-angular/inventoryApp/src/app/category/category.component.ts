import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../_services/category.service';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../_services/products.service';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';  // Optional for pagination
import { MatSort, MatSortModule } from '@angular/material/sort';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSortModule, MatPaginatorModule, RouterLink],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit{
  categories: any[] = [];
  products = new MatTableDataSource<any>(); // Using MatTableDataSource for the table
  displayedColumns: string[] = ['title', 'description', 'unitPrice', 'quantity'];
  selectedCategoryId: number | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private categoryService: CategoryService,
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.route.paramMap.subscribe(params => {
      const categoryId = params.get('categoryId');
      if (categoryId) {
        this.selectedCategoryId = +categoryId; // Convert string to number
        this.loadProducts(this.selectedCategoryId);
      }
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data: any[]) => this.categories = data,
      error: error => console.log(error)
    });
  }
  loadProducts(categoryId: number): void {
    this.productsService.filterProducts(categoryId).subscribe({
      next: (data: any[]) => {
        this.products.data = data; // Update MatTableDataSource
        console.log('Filtered products:', this.products.data); // Log filtered products to the console
      },
      error: error => console.log('Error loading products:', error)
    });
  }

  ngAfterViewInit() {
    this.products.paginator = this.paginator;
    this.products.sort = this.sort;
  }
}