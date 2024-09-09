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
import { Product } from '../../models/product.model';
import { ProductsService } from '../../_services/products.service';
import { Customer } from '../../models/customer.model';
import { CustomersService } from '../../_services/customers.service';
import { OrderService } from '../../_services/order.service';
import { OrderAddModel } from '../../models/order-add.model';

@Component({
  selector: 'app-add-order',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatTableModule, MatCardModule, MatGridListModule, MatButtonModule, MatSelectModule],
  templateUrl: './add-order.component.html',
  styleUrl: './add-order.component.css'
})
export class AddOrderComponent implements OnInit{
   addOrderForm: FormGroup;
   products: Product[] = [];
   customers: Customer[] = [];

   constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private customersService: CustomersService,
    private orderService: OrderService,
    private router: Router
  ) {
    this.addOrderForm = this.initializeForm();
  }
  ngOnInit(): void {
    this.loadProducts();
    this.loadCustomers();
  }

  initializeForm(): FormGroup {
    return this.fb.group({
      customerId: new FormControl('', Validators.required),
      productId: new FormControl(null, Validators.required),
      quantity: new FormControl(0, [Validators.required, Validators.min(1)]),
      unitPrice: new FormControl(0, [Validators.required, Validators.min(1)])
    });
  }

  loadProducts(): void {
    this.productsService.getAllProducts().subscribe({
      next: data => {
        this.products = data;
        console.log('Products loaded:', this.products);  // Check if products are being fetched
      },
      error: err => console.error('Error loading products', err)
    });
  }

  onProductChange(productId: number): void {
    console.log('selected:', productId);
  }

  loadCustomers(): void{
    this.customersService.getAllCustomers().subscribe({
      next: data => {
        this.customers = data;
        console.log('Customers loaded:', this.customers);
      },
      error: err => console.error('Error loading customers', err)
    });
  }

  onCustomerChange(customerId: number): void{
    console.log('selected:', customerId);
  }

  createOrder(): void {
    if (this.addOrderForm.valid) {
      const formValue = this.addOrderForm.value;
      const orderData: OrderAddModel = {
        customerId: formValue.customerId,
        items: [{
          productId: formValue.productId,
          quantity: formValue.quantity,
          unitPrice: formValue.unitPrice
        }]
      };

      this.orderService.createOrder(orderData).subscribe({
        next: () => this.router.navigate(['/orders']),
        error: (err) => console.error('Error creating order', err)
      });
    } else {
      console.log('Form is invalid');
    }
  }
}