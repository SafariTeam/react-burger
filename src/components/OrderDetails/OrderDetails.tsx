import React from "react";
import style from './OrderDetails.module.css';
import { useSelector } from "react-redux";

const orderData = (state: any) => state.order;

const OrderDetails = () => {
    const { orderNumber, isProcceed, isError } = useSelector(orderData);

    return (
        <div className={style.order}>
            {!isProcceed && !isError && <span className={`${style.orderNumber} text text_type_digits-large`}>{orderNumber}</span>}
            <span className="text text_type_main-medium mt-8">идентификатор заказа</span>
            <div className={`${style.image} m-15`}/>
            <span className="text text_type_main-default mb-2">Ваш заказ начали готовить</span>
            <span className="text text_type_main-default text_color_inactive mb-30">Дождитесь готовности на орбитальной станции</span>
        </div>
    )
};

export default OrderDetails;