import {
    MAKE_ORDER_REQUEST,
    MAKE_ORDER_SUCCESS,
    MAKE_ORDER_FAILED 
} from "../actions/order";

const initialState = {
    orderNumber: 0,
    isProcceed: false,
    isError: false,
    error: undefined
}

export const orderReducer = (state = initialState, action) => {
    switch(action.type) {
        case MAKE_ORDER_REQUEST: {
            console.log('req',state);
            return {
                ...state,
                isProcceed: true
            };
        }
        case MAKE_ORDER_SUCCESS: {
            console.log('success',state);
            return {
                ...state,
                isProcceed: false,
                orderNumber: action.order
            };
        }
        case MAKE_ORDER_FAILED: {
            console.log('fail',state);
            return {
                ...state,
                isProcceed: false,
                isError: true,
                error: action.error
            };
        }
        default:
            return {...state}
    }
}