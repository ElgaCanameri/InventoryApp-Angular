import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { ProductsService } from '../../_services/products.service';
import { ProductAddModel } from '../../models/product-add.model';
import { CategoryService } from '../../_services/category.service';
import { Category } from '../../models/category.model';
import { SupplierService } from '../../_services/supplier.service';
import { Supplier } from '../../models/supplier.model';
import { WarehousesService } from '../../_services/warehouses.service';
import { Warehouse } from '../../models/warehouse.model';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatTableModule, MatCardModule, MatGridListModule, MatButtonModule, MatSelectModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit{
  createProductForm: FormGroup;
  categories: Category[] = [];
  suppliers: Supplier[] = [];
  warehouses: Warehouse[] = [];

  constructor(
    private fb: FormBuilder, 
    private productService: ProductsService,
    private categoryService: CategoryService,
    private supplierService: SupplierService,
    private warehouseService: WarehousesService,
    private router: Router
  ) {
    this.createProductForm = this.initializeForm();
  }

ngOnInit(): void {
this.loadCategories();
this.loadSuppliers();
this.loadWarehouses();
}

private initializeForm(): FormGroup {
  return this.fb.group({
    title: new FormControl('', Validators.required),
    description: new FormControl(''),
    categoryId: new FormControl(null, Validators.required),
    unitPrice: new FormControl(0, [Validators.required, Validators.min(0)]),
    supplierId: new FormControl(null, Validators.required),
    quantity: new FormControl(0, [Validators.required, Validators.min(0)]),
    warehouseId: new FormControl(null, Validators.required)
  });
}

loadCategories(): void{
  this.categoryService.getCategories().subscribe({
    next: data =>{
      this.categories = data;
      console.log('Categories loaded:', this.categories);
    },
    error: err => console.error('Error loading categories', err)
  });
}
onCategoryChange(categoryId: number): void{
  console.log('selected:', categoryId);
}

loadSuppliers(): void{
  this.supplierService.getAllSuppliers().subscribe({
    next: data =>  {
      this.suppliers = data;
      console.log('Suppliers loaded:', this.suppliers);
    },
    error: err => console.error('Error loading suppliers', err)
  });
}
onSupplierChange(supplierId: number): void{
  console.log('selected:', supplierId);
}

loadWarehouses(): void{
  this.warehouseService.getAllWarehouses().subscribe({
    next: data => {
      this.warehouses = data;
      console.log('Warehouses loaded:', this.warehouses);
    }, 
    error: err => console.error('Error loading warehouses', err)
  });
}
onWarehouseChange(warehouseId: number): void{
  console.log('selected:', warehouseId);
}

createProduct(): void{
  if (this.createProductForm.valid) {
    const product: ProductAddModel = this.createProductForm.value;
    this.productService.createProduct(product).subscribe({
      next: () => this.router.navigate(['/products']),
      error: (err) => console.error('Error creating product', err)
    });
  } else {
    console.log('Form is invalid');
  }
}
}
