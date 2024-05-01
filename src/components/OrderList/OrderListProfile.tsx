import React, { useCallback, useMemo } from "react";
import style from './OrderList.module.css';
import { useSelector } from "../../services/store";
import { TOrdersFeed } from "../../services/actions/feed";
import OrderListItemUser from "../OrderListItem/OrderListItemUser";

const OrderListProfile = () => {
    const { orders } = useSelector(store => store.profileFeed);

    const card = useCallback((item: TOrdersFeed,index: number) => {
        return (
            <OrderListItemUser key={item._id + index} orderData={item} />
        )
    },[])

    const content = useMemo(
        () => {
                return orders.map((item: TOrdersFeed, index: number) => {return card(item,index)}).reverse();
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

export default OrderListProfile;