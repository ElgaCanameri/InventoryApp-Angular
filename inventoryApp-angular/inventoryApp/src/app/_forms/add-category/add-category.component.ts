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
import { CategoryAddModel } from '../../models/category-add.model';
import { CategoryService } from '../../_services/category.service';

@Component({
  selector: 'app-add-category',
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
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {
  createCategoryForm: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.createCategoryForm = this.initializeForm();
  }

ngOnInit(): void {}

initializeForm(): FormGroup {
  return new FormGroup({
    categoryName: new FormControl('', Validators.required)
  });
}
// --- TO DO ---
createCategory(): void{
  if (this.createCategoryForm.valid) {
    const supplier: CategoryAddModel = this.createCategoryForm.value;
    this.categoryService.createCategory(supplier).subscribe({
      next: () => this.router.navigate(['/categories']),
      error: (err) => console.error('Error creating supplier', err)
    });
  } else {
    console.log('Form is invalid');
  }
}
}

