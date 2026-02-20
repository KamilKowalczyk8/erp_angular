import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth';
import { filter } from 'rxjs';

@Component({
  selector: 'app-main-layout',
  standalone: false,
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout implements OnInit{

   pageTitle: string = 'ERP System';
   userName: string = 'Ładowanie...';

  constructor(
    private authService: AuthService, 
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.updateTitle();

    this.authService.user$.subscribe( user => {
      if (user) {
        this.userName = user.username;
      } else {
        this.authService.refreshUser();
      }
    })
      
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateTitle();
    });
  }

  private updateTitle() {
    let child = this.activatedRoute.firstChild;

    if (child && child.snapshot.data['title']) {
      this.pageTitle = child.snapshot.data['title'];
    }
  }

 

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']); 
  }
}

