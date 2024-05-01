import { request } from '../../api/api';
import { TIngredient } from '../../components/BurgerIngredients/Ingredient';
export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' = 'GET_INGREDIENTS_FAILED';
export const DELETE_ITEM: 'DELETE_ITEM' = 'DELETE_ITEM';
export const ADD_ITEM: 'ADD_ITEM' = 'ADD_ITEM';
export const SET_ACTIVE_TAB: 'SET_ACTIVE_TAB' = 'SET_ACTIVE_TAB';
export const MOVE_ITEM: 'MOVE_ITEM' = 'MOVE_ITEM';
export const CLEAR_ITEMS: 'CLEAR_ITEMS' = 'CLEAR_ITEMS';

export interface IIngredient {
  _id: string;
  name: string;
  type: "main" | "sauce" | "bun";
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  dragIndex?: number;
  uid?: number;
  index?: number;
}

export interface IGetIngredientsRequest {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsFailed {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export interface IGetIngredientsSuccess {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly items: ReadonlyArray<IIngredient>;
}

export interface ISetActiveTab {
  readonly type: typeof SET_ACTIVE_TAB;
  readonly tab: string;
}

export interface IAddIngredient {
  readonly type: typeof ADD_ITEM;
  readonly item: IIngredient;
}

export interface IRemoveIngredient {
  readonly type: typeof DELETE_ITEM;
  readonly item: IIngredient;
}

export interface IMoveIngredient {
  readonly type: typeof MOVE_ITEM;
  readonly hoverIndex: number;
  readonly dragIndex: number;
}

export interface IClearIngredients {
  readonly type: typeof CLEAR_ITEMS;
}

export type TIngredientsActions = 
| IGetIngredientsRequest
| IGetIngredientsFailed
| IGetIngredientsSuccess
| ISetActiveTab
| IAddIngredient
| IRemoveIngredient
| IMoveIngredient
| IClearIngredients;

export const getIngredientsAction = (): IGetIngredientsRequest => ({
  type: GET_INGREDIENTS_REQUEST
});

export const getIngredientsFailedAction = (): IGetIngredientsFailed => ({
  type: GET_INGREDIENTS_FAILED
});

export const getIngredientsSuccessAction = (items: ReadonlyArray<IIngredient>): IGetIngredientsSuccess => ({
  type: GET_INGREDIENTS_SUCCESS,
  items
});

export const setActiveTabAction = (tab: string): ISetActiveTab => ({
  type: SET_ACTIVE_TAB,
  tab
});

export const addIngredientAction = (item: IIngredient): IAddIngredient => ({
  type: ADD_ITEM,
  item: {...item}
});

export const removeIngredientAction = (item: IIngredient): IRemoveIngredient => ({
  type: DELETE_ITEM,
  item
});

type TIngredientsRequest = {
  success: boolean;
  data: ReadonlyArray<TIngredient>;
}

export const getItems = () => (dispatch: any) => {
  dispatch(getIngredientsAction());
  request<TIngredientsRequest>('ingredients')
    .then(res => {
      dispatch(getIngredientsSuccessAction(res.data))
    })
    .catch(error => {
      dispatch(getIngredientsFailedAction())
    })
}

export const setActiveTab = (tab: string) => (dispatch: any) => {
  dispatch(setActiveTabAction(tab));
};

export const addIngredient = (ingredient: IIngredient) => (dispatch: any) => {
  dispatch(addIngredientAction(ingredient));
};

export const removeIngredient = (ingredient: IIngredient) => (dispatch: any) => {
  dispatch(removeIngredientAction(ingredient));
};

