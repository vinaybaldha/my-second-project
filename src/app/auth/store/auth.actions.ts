import { Action } from '@ngrx/store';

export const LOGIN_START = '[Auth] Login Start';
export const AUTHENTICATION_FAIL = '[Auth] Login Fail';
export const AUTHENTICATION_SUCCESS = '[Auth] Login';
export const LOGOUT = '[Auth] Logout';
export const SIGNUP_START = '[Auth] SignUp Start';
export const CLEAR_ERROR = '[Auth] Clear Error';
export const AUTO_LOGIN = '[Auth] Auto Login';

export class AuthenticationSuccess implements Action {
  readonly type: string = AUTHENTICATION_SUCCESS;
  constructor(
    public payload: {
      email: string;
      userId: string;
      token: string;
      expirationDate: Date;
    }
  ) {}
}

export class Logout implements Action {
  readonly type: string = LOGOUT;
}

export class LoginStart implements Action {
  readonly type: string = LOGIN_START;
  constructor(public payload: { email: string; password: string }) {}
}

export class AuthenticationFail implements Action {
  readonly type: string = AUTHENTICATION_FAIL;
  constructor(public payload: string) {}
}

export class SignUpStart implements Action {
  readonly type: string = SIGNUP_START;
  constructor(public payload: { email: string; password: string }) {}
}

export class ClearError implements Action {
  readonly type: string = CLEAR_ERROR;
}

export class AutoLogin implements Action {
  readonly type: string = AUTO_LOGIN;
}

export type authActions =
  | Logout
  | AuthenticationSuccess
  | LoginStart
  | AuthenticationFail
  | SignUpStart
  | ClearError
  | AutoLogin;
