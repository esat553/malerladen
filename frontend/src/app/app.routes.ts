import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { authGuard, loginGuard } from './guards/authGuard/auth-guard.service';
import { ProductsComponent } from './pages/products/products.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
    canActivate: [loginGuard],
  },
  {
    path: 'products',
    title: 'Produkte',
    component: ProductsComponent,
    canActivate: [authGuard],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' },
];
