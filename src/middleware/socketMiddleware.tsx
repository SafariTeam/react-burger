import type { Middleware, MiddlewareAPI } from 'redux';
import { TAppActions, TRootState } from '../services/store';
import { url } from '../api/api';
import { TWSFeedRootActions } from '../services/actions/feed';
import { TWSFeedRootActionsUser } from '../services/actions/feedUser';
import { setCookie } from '../utils/cookies';

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

const updateToken = async (): Promise<{ success: boolean, accessToken?: string }> => {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    return { success: false };
  }

  try {
    const response = await fetch(`${url}/auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: refreshToken }),
    });

    if (response.ok) {
      const res = await response.json();
      if (res.accessToken) {
        let authToken;
        if (res.accessToken.indexOf('Bearer') === 0) {
          authToken = res.accessToken;
        }
        if (authToken) {
          setCookie('authToken', authToken);
        }
        localStorage.setItem('refreshToken', res.refreshToken);
      }
      return { success: true, accessToken: res.accessToken };
    } else {
      return { success: false };
    }
  } catch (error) {
    return { success: false };
  }
};

export const socketMiddleware = (wsActions: TWSFeedRootActions | TWSFeedRootActionsUser, wsApiURL: string): Middleware<{}, TRootState> => {
  return (store: MiddlewareAPI) => {
    let socket: WebSocket | null = null;

    const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;

    return next => (action: TAppActions) => {
      const { dispatch } = store;
      const { type } = action;

      if (type === wsInit) {
        socket = new WebSocket(action.payload);
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onmessage = async (event) => {
          const { data } = event;
          const orderData: { success: boolean, orders: TOrdersFeed[], total: number, totalToday: number, message: string | undefined } = JSON.parse(data);

          if (orderData.message === "Invalid or missing token") {
            const tokenResponse = await updateToken();
            if (tokenResponse.success) {
              const newSocketUrl = `${wsApiURL}`;
              socket = new WebSocket(newSocketUrl);
              dispatch({ type: wsInit, payload: newSocketUrl });
            }
          } else if (orderData.success) {
            dispatch({
              type: onMessage,
              orders: orderData.orders,
              total: orderData.total,
              totalToday: orderData.totalToday,
            });
          } else {
            dispatch({ type: onError, payload: event });
          }

        };
        socket.onclose = () => {
          dispatch({ type: onClose });
        };

        if (type === onClose) {
          socket.close();
        }

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        }

        if (type === onError) {
          socket.close();
        }
      }

      next(action);
    };
  };
};