import { request } from '../../api/api';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookies';
export const FORGOT_PASSWORD: 'FORGOT_PASSWORD' = 'FORGOT_PASSWORD';
export const UPDATE_PROFILE_DATA: 'UPDATE_PROFILE_DATA' = 'UPDATE_PROFILE_DATA';
export const PROFILE_REQUEST: 'PROFILE_REQUEST' = 'PROFILE_REQUEST';
export const PROFILE_SUCCESS: 'PROFILE_SUCCESS' = 'PROFILE_SUCCESS';
export const REGISTER_SUCCESS: 'REGISTER_SUCCESS' = 'REGISTER_SUCCESS';
export const PROFILE_FAIL: 'PROFILE_FAIL' = 'PROFILE_FAIL';
export const LOGIN_SUCCESS: 'LOGIN_SUCCESS' = 'LOGIN_SUCCESS';
export const LOGOUT_SUCCESS: 'LOGOUT_SUCCESS' = 'LOGOUT_SUCCESS';

export type TUser = {
    email: string;
    password: string;
    name: string;
};

export interface IForgotPasswordSuccess {
  readonly type: typeof FORGOT_PASSWORD;
  readonly success: boolean;
  readonly message: string;
}

export interface IProfileRequest {
  readonly type: typeof PROFILE_REQUEST;
}

export interface IProfileFailed {
  readonly type: typeof PROFILE_FAIL;
  readonly error: string;
}

export interface IRegisterSuccess {
  readonly type: typeof REGISTER_SUCCESS;
  readonly success: boolean;
  readonly user: TUser;
}

export interface IUpdateDataSuccess {
  readonly type: typeof UPDATE_PROFILE_DATA;
  readonly success: boolean;
  readonly user: TUser;
  readonly password?: string;
}

export interface ILoginSuccess {
  readonly type: typeof LOGIN_SUCCESS;
  readonly success: boolean;
  readonly user: TUser;
}

export interface ILogoutSuccess {
  readonly type: typeof LOGOUT_SUCCESS;
  readonly success: boolean;
  readonly message: string;
}

export const profileRequestAction = (): IProfileRequest => ({
  type: PROFILE_REQUEST
});

export const profileFaildeAction = (error: string): IProfileFailed => ({
  type: PROFILE_FAIL,
  error
});

export const registerAction = (success: boolean, user: TUser): IRegisterSuccess => ({
  type: REGISTER_SUCCESS,
  success,
  user
});

export const updateDataAction = (success: boolean, user: TUser, password?: string): IUpdateDataSuccess => ({
  type: UPDATE_PROFILE_DATA,
  success,
  user,
  password
});

export const loginSuccessAction = (success: boolean, user: TUser): ILoginSuccess => ({
  type: LOGIN_SUCCESS,
  success,
  user
});

export const logoutSuccessAction = (success: boolean, message: string): ILogoutSuccess => ({
  type: LOGOUT_SUCCESS,
  success,
  message
});

export const forgotPasswordSuccessAction = (success: boolean, message: string): IForgotPasswordSuccess => ({
  type: FORGOT_PASSWORD,
  success,
  message
});

export type TProfileActions = 
| IForgotPasswordSuccess
| IProfileRequest
| IProfileFailed
| IRegisterSuccess
| IUpdateDataSuccess
| ILoginSuccess
| ILogoutSuccess;

export interface IUserRequest extends IResponse {
  accessToken: string;
  refreshToken: string;
  user: TUser;
}

interface IResponse {
  success: boolean;
  message: string;
}

export const register = (user: TUser) => (dispatch: any) => {
    const body = {email: user.email, password: user.password, name: user.name};
    const data = {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    };
    dispatch(profileRequestAction());
    request<IUserRequest>('auth/register',data)
    .then(res => {
        let authToken;
        if (res.accessToken.indexOf('Bearer') === 0) {
            authToken = res.accessToken;
        }
        if (authToken) {
            setCookie('authToken', authToken);
        }
        localStorage.setItem('refreshToken',res.refreshToken);
        setCookie('password',user.password);
        dispatch(registerAction(res.success, res.user));
    })
    .catch(error => {
        dispatch(profileFaildeAction(error));
    })
}

export const RestorePassword = (email: string) => (dispatch: any) => {
    const body = {email: email};
    const data = {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    };
    dispatch(profileRequestAction());
    request<IResponse>('password-reset',data)
    .then(res => {
        dispatch(forgotPasswordSuccessAction(res.success, res.message));
    })
    .catch(error => {
        dispatch(profileFaildeAction(error));
    })
}

export const UpdatePassword = (restorationData: {password: string, token: string}) => (dispatch: any) => {
    const body = {password: restorationData.password, token: restorationData.token};
    const data = {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    };
    dispatch(profileRequestAction());
    request<IResponse>('password-reset/reset',data)
    .then(res => {
        setCookie('password',restorationData.password);
        dispatch(forgotPasswordSuccessAction(res.success, res.message));
    })
    .catch(error => {
        dispatch(profileFaildeAction(error));
    })
}

export const Logout = () => (dispatch: any) => {
    const body = {token: localStorage.getItem('refreshToken')};
    const data = {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    };
    dispatch(profileRequestAction());
    request<IResponse>('auth/logout',data)
    .then(res => {
        deleteCookie('authToken');
        localStorage.removeItem('refreshToken');
        dispatch(logoutSuccessAction(res.success, res.message));
    })
    .catch(error => {
        dispatch(profileFaildeAction(error));
    })
}

export const AuthUser = (userdata: TUser) => (dispatch: any) => {
    const body = {email: userdata.email, password: userdata.password};
    const data = {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    };
    dispatch(profileRequestAction());
    request<IUserRequest>('auth/login',data)
    .then(res => {
        let authToken;
        if (res.accessToken.indexOf('Bearer') === 0) {
            authToken = res.accessToken;
        }
        if (authToken) {
            setCookie('authToken', authToken);
        }
        localStorage.setItem('refreshToken',res.refreshToken);
        dispatch(loginSuccessAction(res.success, res.user));
    })
    .catch(error => {
        dispatch(profileFaildeAction(error));
    })
}

export const RequestUser = () => (dispatch: any) => {
    UpdateToken();
    const token = localStorage.getItem('refreshToken');
    if(!token)
        return;
    const data = {
      method: "GET",
      headers: {
        authorization: getCookie('authToken')
      }
    };
    dispatch(profileRequestAction());
    request<IUserRequest>('auth/user',data)
    .then(res => {
        dispatch(updateDataAction(res.success, res.user, getCookie('password')));
    })
    .catch(error => {
        dispatch(profileFaildeAction(error));
    })
}

export const UpdateUser = (user: TUser) => (dispatch: any) => {
    UpdateToken();
    const body = {...user};
    const data = {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        "authorization": getCookie('authToken'),
        "Content-type": "application/json; charset=UTF-8"
      }
    };
    dispatch(profileRequestAction());
    request<IUserRequest>('auth/user',data)
    .then(res => {
        setCookie('password',user.password);
        dispatch(updateDataAction(res.success, res.user));
    })
    .catch(error => {
        dispatch(profileFaildeAction(error));
        //UpdateToken();
        //UpdateUser(user);
    })
}

const UpdateToken = (): void => {
    const token = localStorage.getItem('refreshToken');
    if(!token)
        return;
    const body = {token: token};
    const data = {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
        "Content-type": "application/json; charset=UTF-8"
        }
    };
    request<IUserRequest>('auth/token',data)
    .then(res => {
        let authToken;
        if (res.accessToken.indexOf('Bearer') === 0) {
            authToken = res.accessToken;
        }
        if (authToken) {
            setCookie('authToken', authToken);
        }
        localStorage.setItem('refreshToken',res.refreshToken);
        RequestUser();
    })
    .catch(error => {
      console.log(error);
    });
}