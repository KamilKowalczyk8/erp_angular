import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  loginForm: FormGroup;
  hide = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      console.log('Wysyłam do Javy:', this.loginForm.value);

      this.authService.login(this.loginForm.value).pipe(
        switchMap(() => this.authService.getMe())
      ).subscribe({
        next: (user) => {
          console.log('Zalogowano! Pobrane dane uzytkownika:', user);

          if (user?.role === 'WAREHOUSE') {
            console.log('Rozpoznano KLIENTA. Przekierowanie do panelu sklepu...');
            this.router.navigate(['/client/shop']);
          } else {
            console.log('Rozpoznano PRACOWNIKA. Przekierowanie do systemu ERP...');
            this.router.navigate(['/inventory']);
          }
        },
        error: (err) => {
          console.error('Błąd logowania:', err);
          alert('Niepoprawne dane logowania lub błąd serwera!');
        }
      });
    }
  }
}
