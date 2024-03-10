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
            return {
                ...state,
                isProcceed: true
            };
        }
        case MAKE_ORDER_SUCCESS: {
            return {
                ...state,
                isProcceed: false,
                orderNumber: action.order
            };
        }
        case MAKE_ORDER_FAILED: {
            return {
                ...state,
                isProcceed: false,
                isError: true,
                error: action.error
            };
        }
        default:
            return state
    }
}