import { Component, OnInit } from '@angular/core';
import { LoginModel } from '../../models/user.model';
import { AccountService } from '../../_services/account.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  model: LoginModel = { username: '', password: '' }; // Initialize the model

  constructor(private accountService: AccountService) {} // Inject the service

  ngOnInit(): void {
    
  }

  login(): void {
    this.accountService.login(this.model).subscribe({
      next: response => {
        console.log('Login successful', response);
      },
      error: error => {
        console.error('Login error', error);
      }
    });
  }
}