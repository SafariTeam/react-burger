import { useSelector } from "react-redux";
import { useParams } from "react-router";

const orderSum = (items, bun, cost) => {
    const bunConst = bun ? bun : 0;
    return bunConst + items.reduce((a,b) => {
        return a + b[cost];
    },0)
};

const generateKey = (pre) => {
    return `${pre}_${new Date().getTime()}`;
}

const GetIngredientById = ({id}) => {
    const {items} = useSelector(state => state.ingredients);
    return items.find(item => item._id === id);
}

export {orderSum, generateKey, GetIngredientById};