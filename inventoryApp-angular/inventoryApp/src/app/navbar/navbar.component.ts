import { Component, inject } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list'; 
import { ProductsComponent } from '../products/products.component';
import { OrdersComponent } from '../orders/orders.component';
import { Router, RouterLink } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import { CategoryComponent } from '../category/category.component';
import { CategoryService } from '../_services/category.service';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../_services/products.service';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,MatSidenavModule,MatListModule,ProductsComponent,OrdersComponent, RouterLink, MatIconModule, MatSelectModule, CategoryComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  categories: { id: number, categoryName: string }[] = [];
  products: any[] = []; // Array to store filtered products
  selectedCategoryId: number | null = null;

  private categoryService = inject(CategoryService);
  private productsService = inject(ProductsService);
  private router = inject(Router);


  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(data => {
      console.log('Loaded Categories:', data); 
      this.categories = data;
    });
  }


  onCategoryChange(categoryId: number): void {
    this.selectedCategoryId = categoryId;
    this.productsService.filterProducts(categoryId).subscribe({
      next: (data: any[]) => {
        this.products = data;
        console.log('Products loaded:', this.products); // Log products to the console
      },
      error: error => console.log(error)
    });
    this.router.navigate(['/categories', categoryId]);    
}}