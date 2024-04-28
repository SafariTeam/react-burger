import React, { useCallback, useMemo } from "react";
import style from './OrderList.module.css';
import OrderListItem from "../OrderListItem";
import { useSelector } from "../../services/store";
import { TOrdersFeed } from "../../services/actions/feed";

const OrderList = () => {
    const { orders } = useSelector(store => store.feed);

    const card = useCallback((item: TOrdersFeed,index: number) => {
        return (
            <OrderListItem key={item._id + index} orderData={item} />
        )
    },[])

    const content = useMemo(
        () => {
                return orders.map((item: TOrdersFeed, index: number) => {return card(item,index)});
        }, [orders,card]
    );
    
    return (
        <div className={style.wrapData}>
            <div className={style.order}>
                {content}
            </div>
        </div>
    )
};

export default OrderList;