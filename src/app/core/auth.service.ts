import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { LoginResponse } from './models/LoginResponse.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private storageKey = 'mock_token';

  private http: HttpClient = inject(HttpClient);

  private _isAuth = signal<boolean>(!!this.getToken());

  public login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/api/login', { email, password }).pipe(
      tap((res) => {
        localStorage.setItem(this.storageKey, res.token);
        this._isAuth.set(true);
      }),
      catchError((err) => throwError(() => err))
    );
  }

  public logout(): void {
    localStorage.removeItem(this.storageKey);
    this._isAuth.set(false);
  }

  public getToken(): string | null {
    return localStorage.getItem(this.storageKey);
  }

  public isAuthenticated(): boolean {
    return !!this.getToken();
  }

  public getRole(): 'admin' | 'user' | null {
    const t = this.getToken();
    if (!t) return null;
    try {
      const jsonStr = ((): string => {
        try {
          return atob(t);
        } catch {
          return t;
        }
      })();

      const payload = JSON.parse(jsonStr);
      return payload?.role ?? null;
    } catch {
      return null;
    }
  }

  public getUserEmail(): string | null {
    const t = this.getToken();
    if (!t) return null;
    try {
      let jsonStr = t;
      try {
        jsonStr = atob(t);
      } catch {}
      const payload = JSON.parse(jsonStr);
      return payload?.email ?? null;
    } catch {
      return null;
    }
  }

  public getUserCity(): string | null {
    const t = this.getToken();
    if (!t) return null;
    try {
      let jsonStr = t;
      try {
        jsonStr = atob(t);
      } catch {}
      const payload = JSON.parse(jsonStr);
      return payload?.city ?? null;
    } catch {
      return null;
    }
  }
}
