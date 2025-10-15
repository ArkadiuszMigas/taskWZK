import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { environment } from '../../env/enviroment';
import { sessionStorageService } from '../services/session-storage.service';

interface LoginBody {
  email: string;
  password: string;
  device: string;
}

type LoginResponse = { token: string };
interface User {
  id: number;
  email: string;
  name: string;
  username: string;
}

@Injectable({ providedIn: 'root' })
export class LoginService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(
    !!this.sessionStorage.getToken()
  );
  readonly isLoggedIn$ = this.isLoggedInSubject.asObservable();
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(
    private http: HttpClient,
    private sessionStorage: sessionStorageService
  ) {}

  get isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  login(
    email: string,
    password: string,
    device: string
  ): Observable<LoginResponse> {
    const body: LoginBody = { email, password, device };
    return this.http
      .post<LoginResponse>(`${environment.apiUrl}/login`, body)
      .pipe(
        tap((res) => {
          this.sessionStorage.setToken(res.token);
          this.isLoggedInSubject.next(true);
        })
      );
  }

  logout(): Observable<void> {
    return this.http.get<void>(`${environment.apiUrl}/logout`).pipe(
      tap(() => {
        this.sessionStorage.clearToken();
        this.isLoggedInSubject.next(false);
      })
    );
  }

  fetchCurrentUser() {
    return this.http.get<User>(`${environment.apiUrl}/login`).pipe(
      tap((user) => {
        this.userSubject.next(user);
      })
    );
  }

  currentUser() {
    return this.userSubject.value;
  }
}
