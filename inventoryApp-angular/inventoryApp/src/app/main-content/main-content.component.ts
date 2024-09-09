import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective  } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CategoryComponent } from '../category/category.component';
import { ProductsComponent } from '../products/products.component';
@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [BaseChartDirective, CommonModule, RouterOutlet, CategoryComponent,ProductsComponent],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.css'
})
export class MainContentComponent{}