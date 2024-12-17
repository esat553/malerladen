import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/authService/auth-service.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  private authService = inject(AuthService);

  logout() {
    this.authService.logout();
    window.location.reload();
  }
}
