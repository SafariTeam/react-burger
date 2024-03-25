import { request } from '../../api/api';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookies';
export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
export const UPDATE_PROFILE_DATA = 'UPDATE_PROFILE_DATA';
export const PROFILE_REQUEST = 'PROFILE_REQUEST';
export const PROFILE_SUCCESS = 'PROFILE_SUCCESS';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const PROFILE_FAIL = 'PROFILE_FAIL';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'

export const Register = (user) => (dispatch) => {
    const body = {email: user.email, password: user.password, name: user.name};
    const data = {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    };
    dispatch({
      type: PROFILE_REQUEST
    });
    request('auth/register',data)
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
        dispatch({type: REGISTER_SUCCESS, user: res.user, success: res.success});
    })
    .catch(error => {
        dispatch({type: PROFILE_FAIL, error: error});
    })
}

export const RestorePassword = (email) => (dispatch) => {
    const body = {email: email};
    const data = {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    };
    dispatch({
      type: PROFILE_REQUEST
    });
    request('password-reset',data)
    .then(res => {
        dispatch({type: FORGOT_PASSWORD, message: res.message, success: res.success});
    })
    .catch(error => {
        dispatch({type: PROFILE_FAIL, error: error});
    })
}

export const UpdatePassword = (restorationData) => (dispatch) => {
    const body = {password: restorationData.password, token: restorationData.token};
    const data = {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    };
    dispatch({
      type: PROFILE_REQUEST
    });
    request('password-reset/reset',data)
    .then(res => {
        setCookie('password',restorationData.password);
        dispatch({type: FORGOT_PASSWORD, message: res.message, success: res.success});
    })
    .catch(error => {
        dispatch({type: PROFILE_FAIL, error: error});
    })
}

export const Logout = () => (dispatch) => {
    const body = {token: localStorage.getItem('refreshToken')};
    const data = {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    };
    dispatch({
      type: PROFILE_REQUEST
    });
    request('auth/logout',data)
    .then(res => {
        deleteCookie('authToken');
        deleteCookie('password');
        localStorage.removeItem('refreshToken');
        dispatch({type: LOGOUT_SUCCESS, success: res.success, message: res.message});
    })
    .catch(error => {
        dispatch({type: PROFILE_FAIL, error: error});
    })
}

export const AuthUser = (userdata) => (dispatch) => {
    const body = {email: userdata.email, password: userdata.password};
    const data = {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    };
    dispatch({
      type: PROFILE_REQUEST
    });
    request('auth/login',data)
    .then(res => {
        let authToken;
        if (res.accessToken.indexOf('Bearer') === 0) {
            authToken = res.accessToken;
        }
        if (authToken) {
            setCookie('authToken', authToken);
        }
        localStorage.setItem('refreshToken',res.refreshToken);
        dispatch({type: LOGIN_SUCCESS, success: res.success, user: res.user});
    })
    .catch(error => {
        dispatch({type: PROFILE_FAIL, error: error});
    })
}

export const RequestUser = () => (dispatch) => {
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
    dispatch({
      type: PROFILE_REQUEST
    });
    request('auth/user',data)
    .then(res => {
        dispatch({type: UPDATE_PROFILE_DATA, success: res.success, user: res.user, password: getCookie('password')});
    })
    .catch(error => {
        dispatch({type: PROFILE_FAIL, error: error});
    })
}

export const UpdateUser = (user) => (dispatch) => {
    UpdateToken();
    const body = {...user};
    console.log(body);
    const data = {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        "authorization": getCookie('authToken'),
        "Content-type": "application/json; charset=UTF-8"
      }
    };
    dispatch({
      type: PROFILE_REQUEST
    });
    request('auth/user',data)
    .then(res => {
        setCookie('password',user.password);
        dispatch({type: UPDATE_PROFILE_DATA, success: res.success, user: res.user});
    })
    .catch(error => {
        dispatch({type: PROFILE_FAIL, error: error});
    })
}

const UpdateToken = () => {
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
    request('auth/token',data)
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
    });
}