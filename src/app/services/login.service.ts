import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private _isLoggedIn = false;

  constructor(private http: HttpClientModule) {}

  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  // call this after a successful login (we'll wire API later)
  setLoggedIn(value: boolean): void {
    this._isLoggedIn = value;
  }
}
