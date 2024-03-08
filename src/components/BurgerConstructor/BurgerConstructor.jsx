import React, { useMemo, useState, useCallback } from "react";
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './BurgerConstructor.module.css';
import ConstructorItem from "./ConstructorItem";
import Modal from "../Modal";
import OrderDetails from "../OrderDetails";
import {generateKey, orderSum} from '../../utils/helpers';
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { MOVE_ITEM, addIngredient } from "../../services/actions/ingredients";
import { makeOrder } from "../../services/actions/order";

const BurgerConstructor = () => {
    const dispatch = useDispatch();
    const { addedItems, bunItem } = useSelector(state => state.ingredients);

    const [visible, updateVisible] = useState(false);

    function displayModal() {
        updateVisible(!visible);
    }

    function createOrder() {
        dispatch(makeOrder([...addedItems,bunItem]));
        updateVisible(!visible);
    }

    const content = useMemo(
        () => {
                return addedItems.map((item,index) => {return <ConstructorItem key={index + generateKey(item._id)} item={item} isDraggable={true} index={item.index} dragIndex={index} />})
        }, [addedItems]
    );

    const ttlPrice = useMemo(() => {
        return addedItems.length > 0 || bunItem ? orderSum(addedItems, bunItem?.price, 'price') : 0;
    },[addedItems,bunItem]); 

    const [{ isHover }, dropTarget] = useDrop({
        accept: 'ingredient',
        collect: monitor => ({
            isHover: monitor.isOver()
        }),
        drop(item) {dispatch(addIngredient(item,generateKey(item._id)))}
    });

    return (
        <div className={style.sideMenu + ' mt-25'}>
            <div className="ml-8 pl-6">
                {bunItem && <ConstructorItem item={bunItem} isDraggable={false} type={'top'} isLocked={true}/>}
            </div>
            <div className={style.wrapData} ref={dropTarget}>
                {content}
            </div>
            <div className="ml-8 pl-6">
            {bunItem && <ConstructorItem item={bunItem} isDraggable={false} type={'bottom'} isLocked={true}/>}
            </div>
            <section className={`${style.orderProcceed} mt-7 mb-7`}>
                <span className={`${style.price} m-1 text text_type_digits-default mr-10`}>
                    <span className="pr-3">{ttlPrice}</span>
                    <CurrencyIcon type="primary" />
                </span>
                <Button htmlType="button" type="primary" size="medium" onClick={createOrder} disabled={!bunItem}>
                    Оформить заказ
                </Button>
            </section>
            {visible ? <Modal onClose={displayModal}><OrderDetails/></Modal> : null}
        </div>
    );
}

export default BurgerConstructor;