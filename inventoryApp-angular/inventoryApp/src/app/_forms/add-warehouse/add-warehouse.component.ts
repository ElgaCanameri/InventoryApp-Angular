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
import { WarehousesService } from '../../_services/warehouses.service';
import { WarehouseAddModel } from '../../models/warehouse-add.model';

@Component({
  selector: 'app-add-warehouse',
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
  templateUrl: './add-warehouse.component.html',
  styleUrl: './add-warehouse.component.css'
})
export class AddWarehouseComponent implements OnInit{
  createWarehouseForm: FormGroup;

  constructor(
    private warehouseService: WarehousesService,
    private router: Router
  ) {
    this.createWarehouseForm = this.initializeForm();
  }

ngOnInit(): void {}

initializeForm(): FormGroup {
  return new FormGroup({
    name: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required)
  });
}
createWarehouse(): void{
  if (this.createWarehouseForm.valid) {
    const supplier: WarehouseAddModel = this.createWarehouseForm.value;
    this.warehouseService.createWarehouse(supplier).subscribe({
      next: () => this.router.navigate(['/warehouses']),
      error: (err) => console.error('Error creating supplier', err)
    });
  } else {
    console.log('Form is invalid');
  }
}
}
