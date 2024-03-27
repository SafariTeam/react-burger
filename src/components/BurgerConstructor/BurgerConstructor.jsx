import React, { useMemo, useState, useCallback } from "react";
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './BurgerConstructor.module.css';
import ConstructorItem from "./ConstructorItem";
import Modal from "../Modal";
import OrderDetails from "../OrderDetails";
import {generateKey, orderSum} from '../../utils/helpers';
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { CLEAR_ITEMS, addIngredient } from "../../services/actions/ingredients";
import { makeOrder } from "../../services/actions/order";
import { useModal } from "../../services/hooks/useModal";
import { useNavigate } from "react-router";

const BurgerConstructor = () => {
    const dispatch = useDispatch();
    const { addedItems, bunItem } = useSelector(state => state.ingredients);
    const { user } = useSelector(state => state.profile);
    const { toggleModal, openModal, closeModal } = useModal();
    const navigate = useNavigate();

    function displayModal() {
        closeModal();
        dispatch({type: CLEAR_ITEMS});
    }

    function createOrder() {
        if(user)
        {
            dispatch(makeOrder([...addedItems,bunItem]));
            openModal();
        }
        else
        {
            navigate('/login');
        }
    }

    const card = useCallback((item,index) => {
        return (
            <ConstructorItem key={item.uid} item={{...item,dragIndex: index}} isDraggable={true} index={item.uid} dragIndex={index} />
        )
    },[])

    const content = useMemo(
        () => {
                return addedItems.map((item,index) => {return card(item,index)});
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
        drop(item) {dispatch(addIngredient({...item,uid: generateKey(item._id)}))}
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
            {toggleModal ? <Modal onClose={displayModal}><OrderDetails/></Modal> : null}
        </div>
    );
}

export default BurgerConstructor;