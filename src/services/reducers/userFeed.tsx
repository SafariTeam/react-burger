import { WS_CONNECTION_START_USER, WS_CONNECTION_SUCCESS_USER, WS_CONNECTION_ERROR_USER, WS_CONNECTION_CLOSED_USER, WS_GET_MESSAGE_USER, TWSFeedActionsUser } from "../actions/feedUser";
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

const obj = {
    ingredients: ["643d69a5c3f7b9001cfa0943","643d69a5c3f7b9001cfa093c","643d69a5c3f7b9001cfa093c"],
    number: 38904,
    name: "Краторный space бургер",
    status: "done",
    createdAt: "2024-04-28T19:31:45.731Z",
    _id: "662ea42197ede0001d067fc0",
    price: 0,
    updatedAt: "2024-04-28T19:31:46.311Z",
}

export const userFeedReducer = (state = initialState, action: TWSFeedActionsUser) => {
    switch (action.type) {
        case WS_CONNECTION_START_USER: {
            return {
                ...state,
            };
        }
        case WS_CONNECTION_SUCCESS_USER: {
            return {
                ...state,
                wsConnected: true
            };
        }
        case WS_CONNECTION_ERROR_USER: {
            return {
                ...state,
                wsConnected: false,
                error: action.error
            };
        }
        case WS_CONNECTION_CLOSED_USER: {
            return {
                ...state,
                wsConnected: false,
                orders: [],
                total: 0,
                totalToday: 0,
            };
        }
        case WS_GET_MESSAGE_USER: {
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