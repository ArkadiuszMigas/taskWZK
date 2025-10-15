import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { environment } from '../../env/enviroment';
import { sessionStorageService } from '../services/session-storage.service';

type LoginBody = { email: string; password: string; device: string };
type LoginResponse = { token: string };

@Injectable({ providedIn: 'root' })
export class LoginService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(
    !!this.sessionStorage.getToken()
  );
  readonly isLoggedIn$ = this.isLoggedInSubject.asObservable();

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
}
