import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../core/services/auth';

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
    private auth: Auth,
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

      this.auth.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Backend odpowiedział sukcesem!', response);
          this.router.navigate(['/magazyn']);
        },
        error: (err) => {
          console.error('Błąd logowania:', err);
          alert('Niepoprawne dane logowania!');
        }
      })
    }
  }
}
