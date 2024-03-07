import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { ingredientsReducer } from "./reducers/ingredients";
import { customMiddleware } from "../middleware/Middleware";
import { orderReducer } from "./reducers/order";

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    order: orderReducer
});

export const store = configureStore({
    reducer: rootReducer,
    //middleware: getDefaultMiddleware => getDefaultMiddleware().concat(customMiddleware())
});