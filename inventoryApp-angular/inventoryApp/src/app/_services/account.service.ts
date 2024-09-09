import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginModel, RegisterModel } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient)
  baseUrl = 'https://localhost:7223/api';

  register(model: RegisterModel) {
    return this.http.post<any>(`${this.baseUrl}/Account/Register`, model);
  }
  login(model: LoginModel) {
    return this.http.post<any>(`${this.baseUrl}/Account/login`, model);
  }
}
