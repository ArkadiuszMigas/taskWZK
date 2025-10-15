import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {
  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    if (!this.loginService.isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }
  }
}
