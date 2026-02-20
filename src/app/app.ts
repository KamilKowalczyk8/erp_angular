import { Component, signal } from '@angular/core';
import { AuthService } from './core/services/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App {
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getMe().subscribe({
      next: user => {
        console.log("Zalogowany:", user)
      },
      error: () => {
        console.log("Niezalogowany");
      }
    })
  }

  protected readonly title = signal('erp-frontend');
  hide = true;


}
