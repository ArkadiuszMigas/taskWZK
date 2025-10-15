import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

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
  submitting = false;
  serverError: string | null = null;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]], //min 6 znaków
  });

  constructor(
    private loginService: LoginService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  get f() {
    return this.form.controls;
  }

  submit() {
    this.serverError = null;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting = true;

    const { email, password } = this.form.value as {
      email: string;
      password: string;
    };
    const device = detectBrowserName();

    this.loginService.login(email, password, device).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: (err) => {
        this.serverError = err?.error?.message || 'Login failed';
        this.submitting = false;
      },
      complete: () => (this.submitting = false),
    });
  }
}
