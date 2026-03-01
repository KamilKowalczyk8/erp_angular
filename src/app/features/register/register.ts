import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  registerForm: FormGroup;
  hide = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    });
  }

  onRegister() {
    if (this.registerForm.valid) {
      console.log('Wysyłam do rejestracji do Javy:', this.registerForm.value);

      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          console.log('Backend utworzył konto!', response);
          alert('Konto zostało poprawnie utworzone! Możesz się zalogować.');
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Błąd rejestracji:', err);
          alert('Niepoprawne dane rejestracji!');
        }
      })
    }
  }
}
