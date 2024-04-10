import React, { FC } from "react";
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './Ingredient.module.css';
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";

export type TIngredient = {
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
};

type TParams = {
    key: string;
    data: TIngredient;
};

const Ingredient: FC<TParams> = ({data}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const id = data._id;
    function displayModal() {
        navigate(`/ingredients/${id}`, {state: {previousLocation: location}});
    }

    const { addedItems, bunItem } = useSelector((state: any) => state.ingredients);

    const countItems = addedItems.filter((item: TIngredient) => item._id === data._id).length;
    const countBuns = bunItem?._id === data._id ? 1 : 0;
    const count = countItems + countBuns;

    const [{ opacity }, ref] = useDrag({
        type: 'ingredient',
        item: data,
        collect: monitor => ({
          opacity: monitor.isDragging() ? 0.5 : 1
        })
      });
    
    return (
        <>
            <div className={style.burgerdata + ' mr-6 mb-8'} onClick={displayModal} ref={ref} style={{ opacity }}>
                {count > 0 && <Counter size="small" count={count}/>}
                <img src={data.image} alt={data.name}/>
                <span className={'m-1 text text_type_digits-default'}>
                    <span className="pr-3">{data.price}</span>
                    <CurrencyIcon type="primary" />
                </span>
                <span style={{textAlign: 'center'}}>{data.name}</span>
            </div>
        </>
    )
};

export default Ingredient;