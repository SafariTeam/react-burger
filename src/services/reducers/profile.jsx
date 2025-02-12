import { PayloadAction } from "@reduxjs/toolkit";
import {
    FORGOT_PASSWORD,
    UPDATE_PROFILE_DATA,
    PROFILE_REQUEST,
    PROFILE_SUCCESS,
    PROFILE_FAIL,
    REGISTER_SUCCESS,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS
} from "../actions/profile";

// type TState = {
//     success: boolean;
//     user?: TUser;
//     message?: string;
//     isError: boolean;
//     isLoading: boolean;
//     password?: string;
// }

// export type TUser = {
//     email: string;
//     password: string;
//     name: string;
// };

const initialState = {
    success: false,
    user: null,
    message: '',
    isError: false,
    isLoading: false,
    password: '',
}

export const profileReducer = (state = initialState, action) => {
    switch(action.type) {
        case PROFILE_REQUEST: {
            return {
                ...state,
                success: false,
                isLoading: true,
                isError: false
            }
        }
        case PROFILE_SUCCESS : {
            return {
                ...state,
                isLoading: false,
                isError: false
            }
        }
        case PROFILE_FAIL: {
            return {
                ...state,
                success: false,
                isLoading: false,
                isError: true,
                message: action.error
            }
        }
        case REGISTER_SUCCESS : {
            return {
                ...state,
                isLoading: false,
                isError: false,
                user: action.user,
                accessToken: action.accessToken,
                refreshToken: action.refreshToken,
                success: action.success,
                message: ''
            }
        }
        case FORGOT_PASSWORD: {
            return {
                ...state,
                isLoading: false,
                isError: false,
                success: action.success,
                message: action.message
            }
        }
        case LOGIN_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isError: false,
                success: action.success,
                user: action.user
            }
        }
        case UPDATE_PROFILE_DATA: {
            return {
                ...state,
                isLoading: false,
                isError: false,
                success: action.success,
                user: action.user,
                password: action.password
            }
        }
        case LOGOUT_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isError: false,
                success: action.success,
                user: null
            }
        }
        default: 
            return state
    }
}