import React from "react";
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './Ingredient.module.css';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import ModalOverlay from "../ModalOverlay";
import IngredientsTypes from "../../utils/IngredientsTypes";
import IngredientDetails from "../IngredientDetails";

const Ingredient = ({ data, count }) => {
    const [visible, updateVisible] = React.useState(false);

    function displayModal() {
        updateVisible(!visible);
    }
    
    return ( 
        <>
        <div className={style.burgerdata + ' mr-6 mb-8'} onClick={displayModal}>
            {count > 0 && <Counter size="small"/>}
            <img src={data.image}/>
            <span className={'m-1 text text_type_digits-default'}>
                <span className="pr-3">{data.price}</span>
                <CurrencyIcon type="primary" />
            </span>
            <span style={{textAlign: 'center'}}>{data.name}</span>
        </div>
        {visible ? <><Modal onClose={()=>displayModal()} title={"Детали ингридиента"}><IngredientDetails ingredient={data}/></Modal><ModalOverlay onClose={()=>displayModal()}/></> : null}
        </>
    )
};

Ingredient.prototype = {
    data: PropTypes.shape(IngredientsTypes).isRequired,
    count: PropTypes.number
}

export default Ingredient;