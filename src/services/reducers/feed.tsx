import { WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_CONNECTION_ERROR, WS_CONNECTION_CLOSED, WS_GET_MESSAGE, TWSFeedActions } from "../actions/feed";
import { TOrdersFeed } from "../actions/feed";

export type TWSFeedState = {
    wsConnected: boolean
    orders: TOrdersFeed[]
    total: number
    totalToday: number
}

const initialState: TWSFeedState = {
    wsConnected: false,
    orders: [],
    total: 0,
    totalToday: 0
}

export const feedReducer = (state = initialState, action: TWSFeedActions) => {
    switch (action.type) {
        case WS_CONNECTION_START: {
            return {
                ...state,
            };
        }
        case WS_CONNECTION_SUCCESS: {
            return {
                ...state,
                wsConnected: true
            };
        }
        case WS_CONNECTION_ERROR: {
            return {
                ...state,
                wsConnected: false,
                error: action.error
            };
        }
        case WS_CONNECTION_CLOSED: {
            return {
                ...state,
                wsConnected: false,
                orders: [],
                total: 0,
                totalToday: 0,
            };
        }
        case WS_GET_MESSAGE: {
            return {
                ...state,
                orders: action.orders,
                total: action.total,
                totalToday: action.totalToday,
            };
        }
        default:
            return state;
    }
};