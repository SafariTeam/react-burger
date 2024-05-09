export const url = 'https://norma.nomoreparties.space/api';
export const url_web_socket = "wss://norma.nomoreparties.space";
export const url_web_orders = 'wss://norma.nomoreparties.space/orders'
export const url_web_feed = 'wss://norma.nomoreparties.space/orders/all'

const checkResponse = (res: Response): Promise<Response> => {
    return res?.ok ? res.json() : Promise.reject(res.status);
};

const checkSuccess = (res: any) => {
    return res?.success ? res : Promise.reject(`Ответ не success: ${res}`);
};

export function request<T>(endpoint: string, data?: any): Promise<T> {
    return fetch(`${url}/${endpoint}`, data)
        .then<Response>(checkResponse)
        .then(checkSuccess);
};