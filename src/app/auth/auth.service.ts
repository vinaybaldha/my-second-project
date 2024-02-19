import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { Subject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';

export interface authResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new Subject<User>();
  constructor(private http: HttpClient) {}
  private handleAuth(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
  }
  signUp(email: string, password: string) {
    return this.http
      .post<authResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBE71GY_bntI9z0PVjZEvTdxl7_LeMApXc',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((errorResp) => this.handleError(errorResp)),
        tap((respData) => {
          this.handleAuth(
            respData.email,
            respData.localId,
            respData.idToken,
            +respData.expiresIn
          );
        })
      );
  }
  login(email: string, password: string) {
    return this.http
      .post<authResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBE71GY_bntI9z0PVjZEvTdxl7_LeMApXc',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((errorResp) => this.handleError(errorResp)),
        tap((respData) => {
          this.handleAuth(
            respData.email,
            respData.localId,
            respData.idToken,
            +respData.expiresIn
          );
        })
      );
  }
  private handleError(errorResp: HttpErrorResponse) {
    let errorMassage = 'unexpected error occured.';
    console.log(errorResp);
    if (!errorResp.error || !errorResp.error.error) {
      return throwError(errorMassage);
    }
    switch (errorResp.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMassage = 'email already exists';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMassage = 'enter valid email and password';
        break;
    }
    return throwError(errorMassage);
  }
}
