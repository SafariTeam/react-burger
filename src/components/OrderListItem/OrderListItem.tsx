import React, { FC } from "react";
import style from './OrderListItem.module.css';
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { TIngredient } from "../BurgerIngredients/Ingredient";
import { GetIngredientById, orderSum } from "../../utils/helpers";
import { TOrdersFeed } from "../../middleware/socketMiddleware";
import { useLocation, useNavigate } from "react-router-dom";

export type TOrderItemData = {
    orderData: TOrdersFeed;
}

const OrderListItem: FC<TOrderItemData> = (props) => {
    const { createdAt, name, ingredients, number, status, _id } = props.orderData;
    const navigate = useNavigate();
    const location = useLocation();
    const id = _id;
    function displayModal() {
        navigate(`/feed/${id}`, {state: {previousLocation: location}});
    }

    const statusStyle = (status: string | undefined) => {
        if(status === undefined)
            return style.statusHide;
        
        return status === "pending" ? style.inProgress : status === "canceled" ? style.canceled : null;
    }

    const orderStatus = (status: string): string => {
        switch (status) {
        case "done":
            return 'Выполнен';
        case "pending":
            return "В работе";
        case 'created':
            return "Создан";
        default:
            return "";
        }
    }

    const getDate = () => {
        return <FormattedDate date={new Date(createdAt)} />
    }

    const getStyle = (index: number, image: string): React.CSSProperties => {
        return {
            backgroundImage: "url('" + image + "')",
            zIndex: 1000-index
        }
    };

    const sum = orderSum(ingredients.map(x => GetIngredientById(x)),0);

    const getUniqueIngredients = (ingredientsIds: readonly string[]): TIngredient[] => {
        let ingredients = ingredientsIds.map(x => GetIngredientById(x));
        let uniqueItems = ingredients.filter((value: TIngredient, index: number, self: readonly TIngredient[]) => {
            return self.indexOf(value) === index;
        });
        return uniqueItems;
    };

    return (
        <div className={style.item} onClick={displayModal}>
            <div className={style.contentheader}>
                <span className="text text_type_digits-default">{`#${number}`}</span>
                <span className="text text_type_main-small text_color_inactive">{getDate()}</span>
            </div>
            <p className="text text_type_main-default mt-5">{`${name} бургер`}</p>
            <p className={`${statusStyle(status)} text text_type_main-small mb-5`}>{orderStatus(status)}</p>
            <div className={style.contentdata}>
                <div className={style.ingredientswrap}>
                    {getUniqueIngredients(ingredients).map((x,index) => {
                        if(index < 5) 
                            return <div className={style.ingredient} style={getStyle(index,x.image_mobile)} key={x._id}></div>; 
                        else if(index === 5) { 
                            const count = ingredients.length - index; 
                            return <div className={style.ingredient} style={getStyle(index,x.image_mobile)} key={x._id}>
                                        <span className="text text_type_main-small pl-2">{`+${count}`}</span>
                                   </div>}
                        else
                            return null;
                        })
                    }
                </div>
                <span className="m-1 text text_type_digits-default">
                    <span className="pr-3">{sum}</span>
                    <CurrencyIcon type="primary" />
                </span>
            </div>
        </div>
    )
};

export default OrderListItem;