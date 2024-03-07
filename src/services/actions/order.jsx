import { sendOrder } from "../../utils/helpers";

export const MAKE_ORDER_REQUEST = 'MAKE_ORDER_REQUEST';
export const MAKE_ORDER_SUCCESS = 'MAKE_ORDER_SUCCESS';
export const MAKE_ORDER_FAILED = 'MAKE_ORDER_FAILED';

export const makeOrder = (order) => (dispatch) => {
    dispatch({
      type: MAKE_ORDER_REQUEST
    });
    sendOrder(order)
    .then(res => {
      dispatch({type: MAKE_ORDER_SUCCESS, name: res.name, order: res.order.number})
    })
    .catch(error => {
      dispatch({type: MAKE_ORDER_FAILED, error: error})
    })
}