import { TIngredient } from "../components/BurgerIngredients/Ingredient";
import { TOrdersFeed } from "../services/actions/feed";
import { useSelector } from "../services/store";

const orderSum = (items: TIngredient[], bun: number): number => {
    if(items === undefined)
        return 0;
    const bunCost = bun ? bun : 0;
    return bunCost + items.reduce((a,b) => {
        return a + b?.price;
    },0)
};

const generateKey = (): number => {
    return new Date().getTime();
}

const GetIngredientById = (id: string, items: ReadonlyArray<TIngredient>): TIngredient => {
    if(items.length === 0)
        return items[0] as TIngredient;
    return items.find((item: TIngredient) => item._id === id) as TIngredient;
}

const GetOrderById = (id: string, orders: ReadonlyArray<TOrdersFeed>): TOrdersFeed => {
    if(orders.length === 0)
        return orders[0] as TOrdersFeed;
    return orders.find((item: TOrdersFeed) => item._id === id) as TOrdersFeed;
}

const GetOrderUserById = (id: string, orders: ReadonlyArray<TOrdersFeed>): TOrdersFeed => {
    return orders.find((item: TOrdersFeed) => item._id === id) as TOrdersFeed;
}

export {orderSum, generateKey, GetIngredientById, GetOrderById, GetOrderUserById};