import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

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
  constructor(private http: HttpClient) {}

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
      .pipe(catchError((errorResp) => this.handleError(errorResp)));
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
      .pipe(catchError((errorResp) => this.handleError(errorResp)));
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
