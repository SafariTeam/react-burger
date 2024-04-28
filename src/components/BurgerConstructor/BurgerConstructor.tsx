import React, { useMemo, useState, useCallback } from "react";
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './BurgerConstructor.module.css';
import ConstructorItem from "./ConstructorItem";
import Modal from "../Modal";
import OrderDetails from "../OrderDetails";
import {generateKey, orderSum} from '../../utils/helpers';
import { DropTargetMonitor, useDrop } from "react-dnd";
import { CLEAR_ITEMS, addIngredient } from "../../services/actions/ingredients";
import { makeOrder } from "../../services/actions/order";
import { useModal } from "../../services/hooks/useModal";
import { useNavigate } from "react-router";
import { TIngredient } from "../BurgerIngredients/Ingredient";
import { useDispatch, useSelector } from "../../services/store";

const BurgerConstructor = () => {
    const dispatch = useDispatch();
    const { addedItems, bunItem } = useSelector(state => state.ingredients);
    const { user } = useSelector(state => state.profile);
    const { toggleModal, openModal, closeModal } = useModal();
    const navigate = useNavigate();

    function displayModal(): void {
        closeModal();
        dispatch({type: CLEAR_ITEMS});
    }

    function createOrder() {
        if(user)
        {
            if(bunItem !== null)
                dispatch(makeOrder([...addedItems,bunItem]));
            else
                dispatch(makeOrder([...addedItems]));
            openModal();
        }
        else
        {
            navigate('/login');
        }
    }

    const card = useCallback((item: TIngredient,index: number) => {
        return (
            <ConstructorItem key={item.uid} item={{...item, dragIndex: index}} isDraggable={true} index={item.uid} dragIndex={index} />
        )
    },[])

    const content = useMemo(
        () => {
                return addedItems.map((item: TIngredient,index: number) => {return card(item,index)});
        }, [addedItems]
    );

    const ttlPrice = useMemo(() => {
        return addedItems.length > 0 || bunItem ? orderSum((addedItems as TIngredient[]), (bunItem?.price as number)) : 0;
    },[addedItems,bunItem]); 

    const [{ isHover }, dropTarget] = useDrop(() => ({
        accept: 'ingredient',
        collect: (monitor: DropTargetMonitor) => ({
            isHover: monitor.isOver()
        }),
        drop(item: TIngredient) {
            dispatch(addIngredient({
                ...item, uid: generateKey(),
                index: 0
            }));
        }
    }));

    return (
        <div className={style.sideMenu + ' mt-25'}>
            <div className="ml-8 pl-6">
                {bunItem && <ConstructorItem item={bunItem} isDraggable={false} type={'top'} isLocked={true} dragIndex={999}/>}
            </div>
            <div className={style.wrapData} ref={dropTarget}>
                {content}
            </div>
            <div className="ml-8 pl-6">
            {bunItem && <ConstructorItem item={bunItem} isDraggable={false} type={'bottom'} isLocked={true} dragIndex={999}/>}
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