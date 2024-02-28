import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import * as fromAuthStore from './store/auth.actions';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';

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
  user = new BehaviorSubject<User>(null);
  tokenExpireTimer: any;

  constructor(private store: Store<fromApp.AppState>) {}

  // private handleAuth(
  //   email: string,
  //   userId: string,
  //   token: string,
  //   expiresIn: number
  // ) {
  //   const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  //   const user = new User(email, userId, token, expirationDate);
  //   // this.user.next(user);
  //   this.store.dispatch(
  //     new fromAuthStore.AuthenticationSuccess({
  //       email: user.email,
  //       userId: user.id,
  //       token: user._token,
  //       expirationDate: user._tokenExpirationDate,
  //     })
  //   );
  //   localStorage.setItem('userData', JSON.stringify(user));
  //   this.autoLogout(expiresIn * 1000);
  // }

  // signUp(email: string, password: string) {
  //   return this.http
  //     .post<authResponse>(
  //       'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBE71GY_bntI9z0PVjZEvTdxl7_LeMApXc',
  //       {
  //         email: email,
  //         password: password,
  //         returnSecureToken: true,
  //       }
  //     )
  //     .pipe(
  //       catchError((errorResp) => this.handleError(errorResp)),
  //       tap((respData) => {
  //         this.handleAuth(
  //           respData.email,
  //           respData.localId,
  //           respData.idToken,
  //           +respData.expiresIn
  //         );
  //       })
  //     );
  // }

  // login(email: string, password: string) {
  //   return this.http
  //     .post<authResponse>(
  //       'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBE71GY_bntI9z0PVjZEvTdxl7_LeMApXc',
  //       {
  //         email: email,
  //         password: password,
  //         returnSecureToken: true,
  //       }
  //     )
  //     .pipe(
  //       catchError((errorResp) => this.handleError(errorResp)),
  //       tap((respData) => {
  //         this.handleAuth(
  //           respData.email,
  //           respData.localId,
  //           respData.idToken,
  //           +respData.expiresIn
  //         );
  //       })
  //     );
  // }

  // private handleError(errorResp: HttpErrorResponse) {
  //   let errorMassage = 'unexpected error occured.';
  //   console.log(errorResp);
  //   if (!errorResp.error || !errorResp.error.error) {
  //     return throwError(errorMassage);
  //   }
  //   switch (errorResp.error.error.message) {
  //     case 'EMAIL_EXISTS':
  //       errorMassage = 'email already exists';
  //       break;
  //     case 'INVALID_LOGIN_CREDENTIALS':
  //       errorMassage = 'enter valid email and password';
  //       break;
  //   }
  //   return throwError(errorMassage);
  // }

  // logout() {
  //   this.store.dispatch(new fromAuthStore.Logout());
  //   // this.user.next(null);
  //   // this.router.navigate(['/auth']);

  //   localStorage.clear();
  //   if (this.tokenExpireTimer) {
  //     clearTimeout(this.tokenExpireTimer);
  //   }
  //   this.tokenExpireTimer = null;
  // }

  // autoLogin() {
  //   const user: User = JSON.parse(localStorage.getItem('userData'));
  //   if (!user) {
  //     return;
  //   }
  //   const loadedUser = new User(
  //     user.email,
  //     user.id,
  //     user._token,
  //     new Date(user._tokenExpirationDate)
  //   );
  //   if (loadedUser.token) {
  //     this.store.dispatch(
  //       new fromAuthStore.AuthenticationSuccess({
  //         email: loadedUser.email,
  //         userId: loadedUser.id,
  //         token: loadedUser._token,
  //         expirationDate: new Date(user._tokenExpirationDate),
  //       })
  //     );
  //     // this.user.next(loadedUser);
  //     const expirationTime =
  //       new Date(user._tokenExpirationDate).getTime() - new Date().getTime();
  //     this.autoLogout(expirationTime);
  //   }
  // }

  setLogoutTimer(expirationTime: number) {
    console.log(expirationTime);
    this.tokenExpireTimer = setTimeout(() => {
      this.store.dispatch(new fromAuthStore.Logout());
    }, expirationTime);
  }

  clearLogoutTimer() {
    clearTimeout(this.tokenExpireTimer);
    this.tokenExpireTimer = null;
  }
}
