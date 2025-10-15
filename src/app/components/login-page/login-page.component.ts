import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

//Wykrywanie przeglądarki
function detectBrowserName(ua: string = navigator.userAgent): string {
  if (/edg\//i.test(ua)) return 'Edge';
  if (/chrome\//i.test(ua)) return 'Chrome';
  if (/firefox\//i.test(ua)) return 'Firefox';
  if (/safari/i.test(ua) && !/chrome/i.test(ua)) return 'Safari';
  return 'Unknown';
}

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  username: string = '';
  password: string = '';
  error: string | null = null;

  constructor(private loginService: LoginService, private router: Router) {}

  logIn(): void {
    this.error = null;
    const device = detectBrowserName();

    this.loginService.login(this.username, this.password, device).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: (err) => {
        this.error = err?.error?.message;
        //console.error(err);
      },
    });
  }
}
