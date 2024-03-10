import { request } from "../../api/api";

export const MAKE_ORDER_REQUEST = 'MAKE_ORDER_REQUEST';
export const MAKE_ORDER_SUCCESS = 'MAKE_ORDER_SUCCESS';
export const MAKE_ORDER_FAILED = 'MAKE_ORDER_FAILED';

export const makeOrder = (order) => (dispatch) => {
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
  request('orders',data)
  .then(res => {
    dispatch({type: MAKE_ORDER_SUCCESS, name: res.name, order: res.order.number})
  })
  .catch(error => {
    dispatch({type: MAKE_ORDER_FAILED, error: error})
  })
    
}