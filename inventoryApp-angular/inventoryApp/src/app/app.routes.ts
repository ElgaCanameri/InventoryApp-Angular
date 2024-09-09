import {Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { AddProductComponent } from './_forms/add-product/add-product.component';
import { OrdersComponent } from './orders/orders.component';
import { AddOrderComponent } from './_forms/add-order/add-order.component';
import { CategoryComponent } from './category/category.component';
import { StockComponent } from './stock/stock.component';
import { CustomerComponent } from './customer/customer.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { SupplierComponent } from './supplier/supplier.component';
import { AddCustomerComponent } from './_forms/add-customer/add-customer.component';
import { AddSupplierComponent } from './_forms/add-supplier/add-supplier.component';
import { AddWarehouseComponent } from './_forms/add-warehouse/add-warehouse.component';
import { AddCategoryComponent } from './_forms/add-category/add-category.component';

export const routes: Routes = [
    { path: '', redirectTo: '/stocks', pathMatch: 'full' },
    { path: 'products', component: ProductsComponent},
    { path: 'product', component: AddProductComponent }, // Route to the AddProductComponent
    {path : 'orders', component: OrdersComponent},
    {path: 'order', component: AddOrderComponent},
    {path:  'categories/:categoryId', component: CategoryComponent},
    {path: 'category', component: AddCategoryComponent},
    {path: 'stocks', component: StockComponent},
    {path: 'customers', component: CustomerComponent},
    {path: 'customer', component: AddCustomerComponent},
    {path: 'warehouses', component: WarehouseComponent},
    {path: 'warehouse', component: AddWarehouseComponent},
    {path: 'suppliers', component: SupplierComponent},
    {path: 'supplier', component: AddSupplierComponent}
];


