import { FC } from "react";
import { useSelector } from "react-redux";
import { Params } from "react-router";
import { TIngredient } from "../components/BurgerIngredients/Ingredient";

type TOrderSum = {
    readonly items: TIngredient[];
    bun: number;
};

interface IData {
    id: string;
}

const orderSum = (items: TIngredient[], bun: number): number => {
    const bunCost = bun ? bun : 0;
    return bunCost + items.reduce((a,b) => {
        return a + b.price;
    },0)
};

const generateKey = (): number => {
    return new Date().getTime();
}

const GetIngredientById = (id: string) => {
    const {items} = useSelector((state: any) => state.ingredients);
    return items.find((item: TIngredient) => item._id === id);
}

export {orderSum, generateKey, GetIngredientById};