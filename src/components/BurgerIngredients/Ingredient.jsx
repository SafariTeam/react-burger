import React from "react";
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './Ingredient.module.css';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import IngredientsTypes from "../../utils/IngredientsTypes";
import IngredientDetails from "../IngredientDetails";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import { useModal } from "../../services/hooks/useModal";

const Ingredient = ({ data }) => {
    const { toggleModal, openModal, closeModal } = useModal();

    function displayModal() {
        !toggleModal ? openModal() : closeModal();
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
            <div className={style.burgerdata + ' mr-6 mb-8'} onClick={displayModal}  ref={ref} style={{ opacity }}>
                {count > 0 && <Counter size="small" count={count}/>}
                <img src={data.image} alt={data.name}/>
                <span className={'m-1 text text_type_digits-default'}>
                    <span className="pr-3">{data.price}</span>
                    <CurrencyIcon type="primary" />
                </span>
                <span style={{textAlign: 'center'}}>{data.name}</span>
            </div>
            {toggleModal ? 
            <Modal onClose={displayModal} title={"Детали ингридиента"}>
                <IngredientDetails ingredient={data}/>
            </Modal> : null}
        </>
    )
};

Ingredient.propTypes = {
    data: PropTypes.shape(IngredientsTypes).isRequired,
    count: PropTypes.number
}

export default Ingredient;