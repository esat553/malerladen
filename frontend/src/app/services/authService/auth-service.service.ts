// auth.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currentUser') || 'null')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http
      .post<any>('http://localhost:5001/login', { username, password })
      .pipe(
        map((user) => {
          console.log('Login erfolgreich:', user);
          // Login erfolgreich, wenn JWT-Token vorhanden
          if (user && user.token) {
            // User-Daten im localStorage speichern
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
          }
          return user;
        })
      );
  }

  async logout() {
    // Entferne User aus localStorage
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    await this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.currentUserValue;
  }

  getUserRole(): string {
    return this.currentUserValue?.role || '';
  }
}
