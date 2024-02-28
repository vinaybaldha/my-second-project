import { User } from '../user.model';
import * as fromAuth from './auth.actions';

export interface State {
  user: User;
  authError: string;
  loading: boolean;
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false,
};

export function authReducer(
  state = initialState,
  action: fromAuth.authActions
): State {
  switch (action.type) {
    case fromAuth.AUTHENTICATION_SUCCESS:
      const user = new User(
        (action as fromAuth.AuthenticationSuccess).payload.email,
        (action as fromAuth.AuthenticationSuccess).payload.userId,
        (action as fromAuth.AuthenticationSuccess).payload.token,
        (action as fromAuth.AuthenticationSuccess).payload.expirationDate
      );
      return {
        ...state,
        user,
        authError: null,
        loading: false,
      };
    case fromAuth.LOGOUT:
      return {
        ...state,
        user: null,
        authError: null,
      };
    case fromAuth.LOGIN_START:
    case fromAuth.SIGNUP_START:
      return {
        ...state,
        authError: null,
        loading: true,
      };
    case fromAuth.AUTHENTICATION_FAIL:
      return {
        ...state,
        user: null,
        authError: (action as fromAuth.AuthenticationFail).payload,
        loading: false,
      };
    case fromAuth.CLEAR_ERROR:
      return {
        ...state,
        authError: null,
      };
    default:
      return state;
  }
}
