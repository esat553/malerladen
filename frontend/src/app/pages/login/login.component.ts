import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/authService/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  hidePassword: boolean = true;

  onLogin() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        this.router.navigate(['/products']);
      },
      error: (error) => {
        // TODO: Anständige Errormessage durch HTTP Codes
        this.errorMessage =
          'Login ist fehlgeschlagen! Bitte überprüfe deine Anmeldedaten.';
        console.error('Login failed', error);
        // Add error handling here
      },
    });
  }

  clearErrorMessage() {
    this.errorMessage = '';
  }
}
