import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  username = '';
  password = '';
  constructor(private loginService: LoginService, private router: Router) {}

  logIn(): void {
    this.loginService.setLoggedIn(true);
    this.router.navigate(['']);
  }
}
