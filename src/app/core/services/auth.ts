import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials, {
      observe: 'response',
      withCredentials: true,
      responseType: "text"
    }).pipe(
      tap(() => this.refreshUser())
    );
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
