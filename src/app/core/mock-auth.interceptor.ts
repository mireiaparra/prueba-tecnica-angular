import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap } from 'rxjs/operators';

@Injectable()
export class MockAuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method === 'POST' && req.url.endsWith('/api/login')) {
      const { email, password } = req.body ?? {};

      return of(null).pipe(
        delay(300),
        mergeMap(() => {
          if (!email || !password) {
            return throwError(
              () =>
                new HttpErrorResponse({
                  status: 400,
                  statusText: 'Bad Request',
                  error: { message: 'Credenciales requeridas' },
                })
            );
          }

          if (typeof password !== 'string' || password.length < 6) {
            return throwError(
              () =>
                new HttpErrorResponse({
                  status: 400,
                  statusText: 'Bad Request',
                  error: { message: 'La contraseña debe tener al menos 6 caracteres' },
                })
            );
          }

          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email)) {
            return throwError(
              () =>
                new HttpErrorResponse({
                  status: 400,
                  statusText: 'Bad Request',
                  error: { message: 'Email no válido' },
                })
            );
          }

          const role = email.endsWith('@sdi.es') ? 'admin' : 'user';

          const payload = { email, role, iat: Date.now() };
          const token = btoa(JSON.stringify(payload));

          const body = { token, role };

          return of(new HttpResponse({ status: 200, body }));
        })
      );
    }

    return next.handle(req);
  }
}
