import React from "react";
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './Ingredient.module.css';
import IngredientsTypes from "../../utils/IngredientsTypes";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";

const Ingredient = ({ data }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const id = data._id;
    function displayModal() {
        navigate(`/ingredients/${id}`, {state: {previousLocation: location}});
    }

    const { addedItems, bunItem } = useSelector(state => state.ingredients);

    const countItems = addedItems.filter(item => item._id === data._id).length;
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

Ingredient.propTypes = {
    data: IngredientsTypes.isRequired
}

export default Ingredient;