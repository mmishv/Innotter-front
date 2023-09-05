import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import env from "../../../environments/.env";

const AUTH_URL = env.userMngUrl;

const httpOptionsForm = {
  headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'})
};

const httpOptionsJSON = {
  headers: new HttpHeaders({'Content-Type': 'application/json; charset=UTF-8'})
};

interface AuthResponse {
  access_token: string;
  refresh_token: string;
}

interface UserResetPassword {
  reset_token: string;
  new_password: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private accessToken = '';
  private refreshToken = '';

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<any> {
    const body = new HttpParams()
      .set('username', username)
      .set('password', password);
    return this.http.post<AuthResponse>(AUTH_URL + '/auth/login/', body.toString(),
      httpOptionsForm).pipe(tap((response) => {
      if (response.access_token) {
        localStorage.setItem(this.accessToken, response.access_token);
        localStorage.setItem(this.refreshToken, response.refresh_token);
      }
    }));
  }

  signup(username: string, email: string, password: string): Observable<any> {
    return this.http.post<AuthResponse>(AUTH_URL + '/auth/signup/', {
      username: username, email: email, password: password
    }, httpOptionsJSON).pipe(tap((response) => {
      if (response.access_token) {
        localStorage.setItem(this.accessToken, response.access_token);
        localStorage.setItem(this.refreshToken, response.refresh_token);
      }
    }));
  }

  logout(): void {
    localStorage.removeItem(this.accessToken);
    localStorage.removeItem(this.refreshToken);
  }

  refreshTokens(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      return new Observable();
    }

    return this.http.post<AuthResponse>(AUTH_URL + `/auth/refresh-token/`, {
      token: refreshToken,
    }, httpOptionsJSON).pipe(tap((response) => {
      if (response.access_token) {
        localStorage.setItem(this.accessToken, response.access_token);
        localStorage.setItem(this.refreshToken, response.refresh_token);
      }
    }));
  }

  getToken(): string | null {
    return localStorage.getItem(this.accessToken);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshToken);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  resetPasswordRequest(email: string): Observable<any> {
    const resetRequest = { email };
    return this.http.post<any>(AUTH_URL + '/auth/reset-password-request/', resetRequest, httpOptionsJSON);
  }

  resetPassword(data: UserResetPassword): Observable<any> {
    return this.http.post<any>(AUTH_URL + '/auth/reset-password/', data, httpOptionsJSON);
  }
}
