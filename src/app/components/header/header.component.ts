import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  username: string = '';
  constructor(private loginService: LoginService, private router: Router) {}

  logout(): void {
    this.loginService.logout().subscribe({
      next: () => {
        this.router.navigateByUrl('/login');
        console.log('Logged out successfully');
      },
      error: (err) => console.error('Logout failed', err),
    });
  }

  ngOnInit(): void {
    this.loginService.fetchCurrentUser().subscribe({
        next: (user) => {
          this.username = user.username;
          console.log('Current user:', user);
        },
        error: (err) => console.error('Failed to load user', err),
      });
  } 
}
