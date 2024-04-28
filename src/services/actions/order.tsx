import { request } from "../../api/api";
import { IIngredient } from "./ingredients";

export const MAKE_ORDER_REQUEST: 'MAKE_ORDER_REQUEST' = 'MAKE_ORDER_REQUEST';
export const MAKE_ORDER_SUCCESS: 'MAKE_ORDER_SUCCESS' = 'MAKE_ORDER_SUCCESS';
export const MAKE_ORDER_FAILED: 'MAKE_ORDER_FAILED' = 'MAKE_ORDER_FAILED';

export interface IOrderRequest {
  readonly type: typeof MAKE_ORDER_REQUEST;
}

export interface IOrderFailed {
  readonly type: typeof MAKE_ORDER_FAILED;
  readonly error: string;
}

export interface IOrderSuccess {
  readonly type: typeof MAKE_ORDER_SUCCESS;
  readonly name: string;
  readonly order: number;
}

export type TOrderActions = 
| IOrderRequest
| IOrderFailed
| IOrderSuccess;

export const orderSuccessAction = (name: string, order: number): IOrderSuccess => ({
  type: MAKE_ORDER_SUCCESS,
  name,
  order
});

export const orderFailedAction = (error: string): IOrderFailed => ({
  type: MAKE_ORDER_FAILED,
  error
});

type TOrderRequest = {
  success:boolean;
  name: string,
  order: {number:number}
}

export const makeOrder = (order: ReadonlyArray<IIngredient>): any => (dispatch: any) => {
  const body = {ingredients: order.map((item) => { return item._id})};
  const data = {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  };
  dispatch({
    type: MAKE_ORDER_REQUEST
  });
  request<TOrderRequest>('orders',data)
  .then(res => {
    dispatch(orderSuccessAction(res.name,res.order.number))
  })
  .catch(error => {
    dispatch(orderFailedAction(error));
    console.log(error);
  })
    
}