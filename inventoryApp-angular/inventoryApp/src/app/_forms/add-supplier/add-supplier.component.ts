import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { SupplierAddModel } from '../../models/supplier-add.model';
import { SupplierService } from '../../_services/supplier.service';
@Component({
  selector: 'app-add-supplier',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatTableModule, 
    MatCardModule, 
    MatGridListModule, 
    MatButtonModule
  ],
  templateUrl: './add-supplier.component.html',
  styleUrl: './add-supplier.component.css'
})
export class AddSupplierComponent implements OnInit{
  createSupplierForm: FormGroup;

  constructor(
    private supplierService: SupplierService,
    private router: Router
  ) {
    this.createSupplierForm = this.initializeForm();
  }

ngOnInit(): void {}

initializeForm(): FormGroup {
  return new FormGroup({
    name: new FormControl('', Validators.required)
  });
}
createSupplier(): void{
  if (this.createSupplierForm.valid) {
    const supplier: SupplierAddModel = this.createSupplierForm.value;
    this.supplierService.createSupplier(supplier).subscribe({
      next: () => this.router.navigate(['/suppliers']),
      error: (err) => console.error('Error creating supplier', err)
    });
  } else {
    console.log('Form is invalid');
  }
}
}
