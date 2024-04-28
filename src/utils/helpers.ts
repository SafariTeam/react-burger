import { TIngredient } from "../components/BurgerIngredients/Ingredient";
import { TOrdersFeed } from "../services/actions/feed";
import { useSelector } from "../services/store";

const orderSum = (items: TIngredient[], bun: number): number => {
    const bunCost = bun ? bun : 0;
    return bunCost + items.reduce((a,b) => {
        return a + b.price;
    },0)
};

const generateKey = (): number => {
    return new Date().getTime();
}

const GetIngredientById = (id: string): TIngredient => {
    const {items} = useSelector(state => state.ingredients);
    return items.find((item: TIngredient) => item._id === id) as TIngredient;
}

const GetOrderById = (id: string): TOrdersFeed => {
    const {orders} = useSelector(state => state.feed);
    return orders.find((item: TOrdersFeed) => item._id === id) as TOrdersFeed;
}

const GetOrderUserById = (id: string): TOrdersFeed => {
    const {orders} = useSelector(state => state.profileFeed);
    return orders.find((item: TOrdersFeed) => item._id === id) as TOrdersFeed;
}

export {orderSum, generateKey, GetIngredientById, GetOrderById, GetOrderUserById};