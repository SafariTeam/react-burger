import { url_web_feed, url_web_orders } from "../../api/api";

export const WS_CONNECTION_START_USER: 'WS_CONNECTION_START_USER' = 'WS_CONNECTION_START_USER';
export const WS_CONNECTION_SUCCESS_USER: 'WS_CONNECTION_SUCCESS_USER' = 'WS_CONNECTION_SUCCESS_USER';
export const WS_CONNECTION_ERROR_USER: 'WS_CONNECTION_ERROR_USER' = 'WS_CONNECTION_ERROR_USER';
export const WS_CONNECTION_CLOSED_USER: 'WS_CONNECTION_CLOSED_USER' = 'WS_CONNECTION_CLOSED_USER';
export const WS_GET_MESSAGE_USER: 'WS_GET_MESSAGE_USER' = 'WS_GET_MESSAGE_USER';

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

export interface IWSFeedConnectActionUser {
    type: typeof WS_CONNECTION_START_USER;
    payload: string;
};

export interface IWSFeedConnectSuccessActionUser {
    type: typeof WS_CONNECTION_SUCCESS_USER;
    payload: Event;
};

export interface IWSFeedConnectErrorActionUser {
    type: typeof WS_CONNECTION_ERROR_USER;
    error: Event;
};

export interface IWSFeedConnectClosedActionUser {
    type: typeof WS_CONNECTION_CLOSED_USER;
};

export interface IWSFeedGetMessageActionUser {
    type: typeof WS_GET_MESSAGE_USER;
    payload?: any;
    orders: TOrdersFeed[];
    total: number;
    totalToday: number
};

export type TWSFeedRootActionsUser = {
    wsInit: typeof WS_CONNECTION_START_USER,
    onOpen: typeof WS_CONNECTION_SUCCESS_USER,
    onClose: typeof WS_CONNECTION_CLOSED_USER,
    onError: typeof WS_CONNECTION_ERROR_USER,
    onMessage: typeof WS_GET_MESSAGE_USER,
};

export type TWSFeedActionsUser =
    | IWSFeedConnectActionUser
    | IWSFeedConnectSuccessActionUser
    | IWSFeedConnectErrorActionUser
    | IWSFeedConnectClosedActionUser
    | IWSFeedGetMessageActionUser;

export const WSOrdersFeedRootActionsUser: TWSFeedRootActionsUser = {
    wsInit: WS_CONNECTION_START_USER,
    onOpen: WS_CONNECTION_SUCCESS_USER,
    onClose: WS_CONNECTION_CLOSED_USER,
    onError: WS_CONNECTION_ERROR_USER,
    onMessage: WS_GET_MESSAGE_USER
};

export const wsMessageActionUser = (orders: TOrdersFeed[], total: number, totalToday: number): IWSFeedGetMessageActionUser => ({
    type: WS_GET_MESSAGE_USER,
    orders,
    total,
    totalToday
});

export const WSStartUser = (token: string): IWSFeedConnectActionUser => ({
    type: WS_CONNECTION_START_USER,
    payload: `${url_web_orders}?token=${token}`
});

export const WSCloseUser = (): IWSFeedConnectClosedActionUser => ({
    type: WS_CONNECTION_CLOSED_USER
});
