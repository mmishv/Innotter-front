import {Injectable} from '@angular/core';
import {
  HttpInterceptor, HttpRequest, HttpHandler, HttpEvent,
} from '@angular/common/http';
import {catchError, Observable, switchMap} from 'rxjs';
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private refreshAttempts = 0;
  private readonly maxRefreshAttempts = 2;

  constructor(private authService: AuthService, private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = request.url.toLowerCase();
    if (url.includes('/auth/login') || url.includes('reset-password')) {
      return next.handle(request);
    }
    const token = this.authService.getToken();
    if (token) {
      request = this.addTokenToRequest(request, token);
    }
    return next.handle(request).pipe(catchError((error) => {
      if ([401, 403].includes(error.status)) {
        if (this.refreshAttempts < this.maxRefreshAttempts) {
          this.refreshAttempts++;
          return this.refreshTokenAndRetry(request, next);
        } else {
          this.authService.logout();
          return new Observable<HttpEvent<any>>();
        }
      } else {
        throw error;
      }
    }));
  }

  private addTokenToRequest(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        token: `${token}`, HTTP_TOKEN: `${token}`,
      },
    });
  }

  private refreshTokenAndRetry(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.refreshTokens().pipe(switchMap((response) => {
      if (response.access_token) {
        const newToken = response.access_token;
        request = this.addTokenToRequest(request, newToken);
        return next.handle(request);
      } else {
        this.authService.logout();
        return new Observable<HttpEvent<any>>();
      }
    }));
  }
}
