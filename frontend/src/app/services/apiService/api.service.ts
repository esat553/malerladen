import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../authService/auth-service.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private baseUrl = 'http://localhost:5001';

  private getHeaders() {
    const token = this.authService.currentUserValue?.token;
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }),
    };
  }

  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${endpoint}`, this.getHeaders());
  }

  post<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(
      `${this.baseUrl}${endpoint}`,
      data,
      this.getHeaders()
    );
  }

  put<T>(endpoint: string, data: any): Observable<T> {
    return this.http.put<T>(
      `${this.baseUrl}${endpoint}`,
      data,
      this.getHeaders()
    );
  }

  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${endpoint}`, this.getHeaders());
  }
}
