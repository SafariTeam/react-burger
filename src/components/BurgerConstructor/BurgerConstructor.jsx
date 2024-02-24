import React from "react";
import {ConstructorElement, CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './BurgerConstructor.module.css';
import PropTypes from 'prop-types';
import ConstructorItem from "./ConstructorItem";
import ingredientsPropTypes from '../../utils/IngredientsTypes';
import Modal from "../Modal";
import OrderDetails from "../OrderDetails";
import {orderSum} from '../../utils/helpers';

const BurgerConstructor = ({items}) => {
    const [visible, updateVisible] = React.useState(false);

    function displayModal() {
        updateVisible(!visible);
    }

    const firstItem = items[0];
    const lastItem = items[items.length-1];
    const actionItems = items.slice(1,-1);
    const ttlPrice = orderSum(items, 'price');

    return (
        <div className={style.sideMenu + ' mt-25'}>
            <div className="ml-8 pl-6">
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={firstItem.name}
                    price={firstItem.price}
                    thumbnail={firstItem.image_mobile}
                />
            </div>
            <div className={style.wrapData}>
                {actionItems.map((item,index) => <ConstructorItem item={item} key={index}/>)}
            </div>
            <div className="ml-8 pl-6">
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={lastItem.name}
                    price={lastItem.price}
                    thumbnail={lastItem.image_mobile}
                />
            </div>
            <section className={`${style.orderProcceed} mt-7 mb-7`}>
                <span className={`${style.price} m-1 text text_type_digits-default mr-10`}>
                    <span className="pr-3">{ttlPrice}</span>
                    <CurrencyIcon type="primary" />
                </span>
                <Button htmlType="button" type="primary" size="medium" onClick={displayModal}>
                    Оформить заказ
                </Button>
            </section>
            {visible ? <Modal onClose={displayModal}><OrderDetails/></Modal> : null}
        </div>
    );
}

BurgerConstructor.prototype = {
    items: PropTypes.arrayOf(ingredientsPropTypes).isRequired
}

export default BurgerConstructor;