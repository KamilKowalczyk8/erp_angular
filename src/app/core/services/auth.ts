import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginRequest, RegisterRequest } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private apiUrlReg = 'http://localhost:8080/api/clients/register';
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(data: LoginRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data, {
      observe: 'response',
      withCredentials: true,
      responseType: "text"
    }).pipe(
      tap(() => this.refreshUser())
    );
  }

  register(data: RegisterRequest): Observable<number> {
    return this.http.post<number>(this.apiUrlReg, data, {
      withCredentials: true
    });
  }

  refreshUser() {
    this.getMe().subscribe(user => this.userSubject.next(user));
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('isLoggedIn');
  }

  getMe(): Observable<any> {
    return this.http.get(`${this.apiUrl}/me`, {
      withCredentials: true
    });
  }


}
