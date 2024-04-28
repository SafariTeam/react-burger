import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./FeedOrderDetails.module.css"
import { TIngredient } from "../BurgerIngredients/Ingredient";
import { GetIngredientById, GetOrderById, orderSum } from "../../utils/helpers";
import { useParams } from "react-router-dom";

const FeedOrderDetails = () => {
    const id = useParams();
    const order = id.id !== undefined ? GetOrderById(id.id): null;
    const getDate = () => {
        return <FormattedDate date={new Date(order?.createdAt as string)} />
    }

    const orderStatus = (): string => {
        switch (order?.status as string) {
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

    const statusStyle = () => {
        if(order?.status === undefined)
            return style.statusHide;
        
        return order?.status === "done" ? style.done : order?.status === "canceled" ? style.canceled : null;
    }

    const getStyle = (index: number, image: string): React.CSSProperties => {
        return {
            backgroundImage: "url('" + image + "')",
            zIndex: 1000-index
        }
    };

    const getUniqueIngredients = () => {
        let ingredients = order?.ingredients.map(x => GetIngredientById(x)) as TIngredient[];
        let uniqueItems = ingredients.filter((value: TIngredient, index: number, self: readonly TIngredient[]) => {
            return self.indexOf(value) === index;
        });
        return uniqueItems;
    };

    const itemsNumbers = (item: TIngredient): number | undefined => {
        let ingredients = order?.ingredients.map(x => GetIngredientById(x)) as TIngredient[];
        const count = ingredients.filter(itm => itm._id === item._id).length;
        return count;
    };

    const sum = orderSum(order?.ingredients.map(x => GetIngredientById(x)) as TIngredient[],0);
    
    return (
        <div className={style.orderData}>
            <span className="text text_type_digits-default mb-10">{`#${order?.number}`}</span>
            <p className="text text text_type_main-medium mb-2">{`${order?.name} бургер`}</p>
            <p className={`${statusStyle()} text text_type_main-small mb-10`}>{orderStatus()}</p>
            <p className="text text text_type_main-medium">Состав:</p>
            <div className={style.contentdata}>
                    {getUniqueIngredients().map((x,index) => {return <div className={style.ingredient}>
                        <div className={style.ingredientData}>
                            <div className={style.ingredientImage} style={getStyle(index,x.image_mobile)}></div>
                            <span className="text text_type_main-small">{x.name}</span>
                        </div>
                        <span className="m-1 text text_type_digits-default">
                            <span className="pr-3">{`${itemsNumbers(x)}x${600}`}</span>
                            <CurrencyIcon type="primary" />
                        </span>
                    </div>})}
            </div>
            <div className={style.contentfooter}>
                <span className="text text_type_main-small text_color_inactive">{getDate()}</span>
                <span className="m-1 text text_type_digits-default">
                    <span className="pr-3">{sum}</span>
                    <CurrencyIcon type="primary" />
                </span>
            </div>
        </div>
    )
};

export default FeedOrderDetails;