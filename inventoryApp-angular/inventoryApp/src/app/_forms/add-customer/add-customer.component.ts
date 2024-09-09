import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { CustomerAddModel } from '../../models/customer-add.model';
import { CustomersService } from '../../_services/customers.service';
@Component({
  selector: 'app-add-customer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatTableModule, MatCardModule, MatGridListModule, MatButtonModule],
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.css'
})
export class AddCustomerComponent implements OnInit{
  createCustomerForm: FormGroup;

  constructor(
    private customerService: CustomersService,
    private router: Router
  ) {
    this.createCustomerForm = this.initializeForm();
  }

ngOnInit(): void {}

initializeForm(): FormGroup {
  return new FormGroup({
    customerName: new FormControl('', Validators.required),
    customerAddress: new FormControl('')
  });
}
createCustomer(): void{
  if (this.createCustomerForm.valid) {
    const customer: CustomerAddModel = this.createCustomerForm.value;
    this.customerService.createProduct(customer).subscribe({
      next: () => this.router.navigate(['/customers']),
      error: (err) => console.error('Error creating customer', err)
    });
  } else {
    console.log('Form is invalid');
  }
}
}
