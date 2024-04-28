import { configureStore, ThunkAction } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { ingredientsReducer } from "./reducers/ingredients";
import { orderReducer } from "./reducers/order";
import { profileReducer } from "./reducers/profile";
import { TypedUseSelectorHook, useDispatch as dispatchHook, useSelector as selecorHook } from "react-redux";
import { TIngredientsActions } from "./actions/ingredients";
import { TOrderActions } from "./actions/order";
import { TProfileActions } from "./actions/profile";
import { TWSFeedActions, WSOrdersFeedRootActions } from "./actions/feed";
import type {} from "redux-thunk/extend-redux";
import { socketMiddleware } from "../middleware/socketMiddleware";
import { url_web_feed, url_web_orders, url_web_socket } from "../api/api";
import { feedReducer } from "./reducers/feed";
import { userFeedReducer } from "./reducers/userFeed";
import { TWSFeedActionsUser, WSOrdersFeedRootActionsUser } from "./actions/feedUser";

export type TRootState = ReturnType<typeof rootReducer>;

export type TAppActions = TIngredientsActions | TOrderActions | TProfileActions | TWSFeedActions | TWSFeedActionsUser;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, TRootState, unknown, TAppActions>;

type AppDispatch<ReturnType = void> = (action: TAppActions | AppThunk) => ReturnType;

export const useDispatch: () => AppDispatch = dispatchHook;

export const useSelector: TypedUseSelectorHook<TRootState> = selecorHook;

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    order: orderReducer,
    profile: profileReducer,
    feed: feedReducer,
    profileFeed: userFeedReducer
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat([socketMiddleware(WSOrdersFeedRootActions,url_web_socket),socketMiddleware(WSOrdersFeedRootActionsUser,url_web_orders)])
});