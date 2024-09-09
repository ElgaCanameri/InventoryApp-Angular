import { Component, OnInit } from '@angular/core';
import { RegisterModel} from '../../models/user.model';
import { AccountService } from '../../_services/account.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  model: RegisterModel = { username: '', password: '' }; // Initialize the model

  constructor(private accountService: AccountService) {} // Inject the service

  ngOnInit(): void {
    // Initialization logic if needed
  }

  register(): void {
    this.accountService.register(this.model).subscribe({
      next: response => {
        console.log('Registration successful', response);
        // Handle successful registration (e.g., redirect or show a message)
      },
      error: error => {
        console.error('Registration error', error);
        // Handle registration error (e.g., show an error message)
      }
    });
  }
}