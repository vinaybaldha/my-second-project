import { Injectable, effect } from '@angular/core';
import { Actions, ofType, createEffect, provideEffects } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as fromAuthActions from './auth.actions';
import { AuthService, authResponse } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../user.model';

const handleAuthentication = (
  email: string,
  localId: string,
  idToken: string,
  expiration: number
) => {
  const expirationDate = new Date(new Date().getTime() + +expiration * 1000);
  const user = new User(email, localId, idToken, expirationDate);
  localStorage.setItem('userData', JSON.stringify(user));
  return new fromAuthActions.AuthenticationSuccess({
    email: email,
    userId: localId,
    token: idToken,
    expirationDate: expirationDate,
  });
};
const handleError = (errorResp: any) => {
  let errorMassage = 'unexpected error occured.';
  console.log(errorResp);
  if (!errorResp.error || !errorResp.error.error) {
    return of(new fromAuthActions.AuthenticationFail(errorMassage));
  }
  switch (errorResp.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMassage = 'email already exists';
      break;
    case 'INVALID_LOGIN_CREDENTIALS':
      errorMassage = 'enter valid email and password';
      break;
  }
  return of(new fromAuthActions.AuthenticationFail(errorMassage));
};

@Injectable()
export class AuthEffects {
  authSignUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthActions.SIGNUP_START),
      switchMap((signUpAction: fromAuthActions.SignUpStart) => {
        return this.http
          .post<authResponse>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBE71GY_bntI9z0PVjZEvTdxl7_LeMApXc',
            {
              email: signUpAction.payload.email,
              password: signUpAction.payload.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            tap((respData) =>
              this.authService.setLogoutTimer(+respData.expiresIn * 1000)
            ),
            map((resp) => {
              return handleAuthentication(
                resp.email,
                resp.localId,
                resp.idToken,
                +resp.expiresIn
              );
            }),
            catchError((errorResp) => {
              return handleError(errorResp);
            })
          );
      })
    )
  );

  authLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthActions.LOGIN_START),
      switchMap((authState: fromAuthActions.LoginStart) => {
        return this.http
          .post<authResponse>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBE71GY_bntI9z0PVjZEvTdxl7_LeMApXc',
            {
              email: authState.payload.email,
              password: authState.payload.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            tap((respData) =>
              this.authService.setLogoutTimer(+respData.expiresIn * 1000)
            ),
            map((resp) => {
              return handleAuthentication(
                resp.email,
                resp.localId,
                resp.idToken,
                +resp.expiresIn
              );
            }),
            catchError((errorResp) => {
              return handleError(errorResp);
            })
          );
      })
    )
  );

  authRedirect = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.AUTHENTICATION_SUCCESS),
        tap(() => {
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  authLogout = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.LOGOUT),
        tap(() => {
          this.authService.clearLogoutTimer();
          localStorage.removeItem('userData');
          this.router.navigate(['/auth']);
        })
      ),
    { dispatch: false }
  );

  autoLogin = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthActions.AUTO_LOGIN),
      switchMap(() => {
        const user: User = JSON.parse(localStorage.getItem('userData'));
        if (!user) {
          return of(new fromAuthActions.Logout());
        }
        const loadedUser = new User(
          user.email,
          user.id,
          user._token,
          new Date(user._tokenExpirationDate)
        );
        if (loadedUser.token) {
          const expirationTime =
            new Date(user._tokenExpirationDate).getTime() -
            new Date().getTime();
          this.authService.setLogoutTimer(expirationTime);
          return of(
            new fromAuthActions.AuthenticationSuccess({
              email: loadedUser.email,
              userId: loadedUser.id,
              token: loadedUser._token,
              expirationDate: new Date(user._tokenExpirationDate),
            })
          );

          // // this.user.next(loadedUser);

          // this.autoLogout(expirationTime);
        }
        return of(null);
      })
    )
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}
}
