import { getIngredients } from '../../utils/helpers';
export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const DELETE_ITEM = 'DELETE_ITEM';
export const ADD_ITEM = 'ADD_ITEM';
export const SET_ACTIVE_TAB = 'SET_ACTIVE_TAB';
export const MOVE_ITEM = 'MOVE_ITEM';


export const getItems = () => (dispatch) => {
  dispatch({
    type: GET_INGREDIENTS_REQUEST
  });
  getIngredients()
    .then(res => {
      dispatch({type: GET_INGREDIENTS_SUCCESS, items: res})
    })
    .catch(error => {
      dispatch({type: GET_INGREDIENTS_FAILED})
    })
}

export const setActiveTab = (tab) => ({
    type: SET_ACTIVE_TAB,
    tab: tab
});

export const addIngredient = (ingredient,index) => ({
    type: ADD_ITEM,
    item: {...ingredient, index}
});

