import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/authService/auth-service.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = authService.isLoggedIn();
  if (isAuthenticated) {
    return true;
  }

  return router.createUrlTree(['/login']);
};

export const loginGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = authService.isLoggedIn();

  if (isAuthenticated) {
    return router.createUrlTree(['/products']);
  }

  return true;
};
