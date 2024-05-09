import { request, url_web_feed, url_web_orders } from "../../api/api";
import { AppDispatch } from "../store";

export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
export const ORDER_REQUEST: 'ORDER_REQUEST' = 'ORDER_REQUEST';
export const ORDER_SUCCESS: 'ORDER_SUCCESS' = 'ORDER_SUCCESS';
export const ORDER_ERROR: 'ORDER_ERROR' = 'ORDER_ERROR';

export type TOrdersFeed = {
    ingredients: string[];
    number: number;
    name: string;
    status: string;
    createdAt: string
    _id: string;
    price: number;
    updatedAt: string;
}

export type TOrderData = {
    success: boolean;
    orders: TOrdersFeed[];
}

export interface IWSFeedConnectAction {
    type: typeof WS_CONNECTION_START;
    payload: string;
};

export interface IWSFeedConnectSuccessAction {
    type: typeof WS_CONNECTION_SUCCESS;
    payload: Event;
};

export interface IWSFeedConnectErrorAction {
    type: typeof WS_CONNECTION_ERROR;
    error: Event;
};

export interface IWSFeedConnectClosedAction {
    type: typeof WS_CONNECTION_CLOSED;
};

export interface IOrderRequestStartAction {
    type: typeof ORDER_REQUEST;
};

export interface IOrederRequestErrorAction {
    type: typeof ORDER_ERROR;
};

export interface IWSFeedGetMessageAction {
    type: typeof WS_GET_MESSAGE;
    payload?: any;
    orders: TOrdersFeed[];
    total: number;
    totalToday: number
};

export type TWSFeedRootActions = {
    wsInit: typeof WS_CONNECTION_START,
    onOpen: typeof WS_CONNECTION_SUCCESS,
    onClose: typeof WS_CONNECTION_CLOSED,
    onError: typeof WS_CONNECTION_ERROR,
    onMessage: typeof WS_GET_MESSAGE,
};

export type TWSFeedActions =
    | IWSFeedConnectAction
    | IWSFeedConnectSuccessAction
    | IWSFeedConnectErrorAction
    | IWSFeedConnectClosedAction
    | IWSFeedGetMessageAction
    | IOrderRequestStartAction
    | IOrederRequestErrorAction
    | IFeedDataSuccess;

export const WSOrdersFeedRootActions: TWSFeedRootActions = {
    wsInit: WS_CONNECTION_START,
    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSED,
    onError: WS_CONNECTION_ERROR,
    onMessage: WS_GET_MESSAGE
};

export interface IFeedDataSuccess {
    readonly type: typeof ORDER_SUCCESS;
    readonly success: boolean;
    readonly payload: TOrdersFeed[];
}

export const feedInfoData = (success: boolean, payload: TOrdersFeed[]): IFeedDataSuccess => ({
    type: ORDER_SUCCESS,
    success,
    payload
});

export const wsMessageAction = (orders: TOrdersFeed[], total: number, totalToday: number): IWSFeedGetMessageAction => ({
    type: WS_GET_MESSAGE,
    orders,
    total,
    totalToday
});

export const WSErrorAction = (error: Event): IWSFeedConnectErrorAction => ({
    type: WS_CONNECTION_ERROR,
    error
});

export const WSStart = () => ({
    type: WS_CONNECTION_START,
    payload: url_web_feed,
});

export const WSClose = (): IWSFeedConnectClosedAction => ({
    type: WS_CONNECTION_CLOSED
});

export const getFeedInfoData = (id: string) => (dispatch: AppDispatch) => {
    const data = {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    };
    dispatch({
        type: ORDER_REQUEST
    });
    request<TOrderData>(`orders/${id}`, data)
        .then(res => {
            console.log(id, res);
            dispatch(feedInfoData(res.success, res.orders))
        })
        .catch(error => {
            dispatch({ type: ORDER_ERROR });
        })
}