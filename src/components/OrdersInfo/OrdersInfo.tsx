import React, { FC, useCallback, useMemo } from "react";
import style from "./OrdersInfo.module.css";
import { TOrdersFeed } from "../../services/actions/feed";

type TFeedInfo = {
  total: number;
  totalToday: number;
  orders: ReadonlyArray<TOrdersFeed>;
};

const OrdersInfo: FC<TFeedInfo> = (props) => {
  const { total, totalToday, orders } = props;

  const done = useCallback((item: TOrdersFeed) => {
    return (
      <p className={`${style.done} text text_type_digits-default`} key={item._id}>
        {item.number}
      </p>
    );
  }, []);

  const doneItems = useMemo(() => {
    return orders.map((item: TOrdersFeed, index: number) => {
      return item.status === "done" && index <= 10 ? done(item) : null;
    });
  }, [orders,done]);

  const pending = useCallback((item: TOrdersFeed) => {
    return (
      <p className={`${style.done} text text_type_digits-default`}>
        {item.number}
      </p>
    );
  }, []);

  const pendingItems = useMemo(() => {
    return orders.map((item: TOrdersFeed, index: number) => {
      return item.status === "pending" && index <= 10
        ? pending(item)
        : null;
    });
  }, [orders,pending]);

  return (
    <div className={style.wrapData}>
      <div className={style.orders}>
        <div>
          <span className="text text_type_main-medium mb-5">Готовы</span>
          {doneItems}
        </div>
        <div>
          <span className="text text_type_main-medium mb-5">В работе</span>
          <p className={`text text_type_digits-default`}>{pendingItems}</p>
        </div>
      </div>
      <h2 className="text text_type_main-medium mt-10 mb-1">
        Выполнено за всё время
      </h2>
      <p className={`${style.orderNumber} text text_type_digits-large mb-10`}>
        {total}
      </p>
      <h2 className="text text_type_main-medium mt-10 mb-1">
        Выполнено за сегодня
      </h2>
      <p className={`${style.orderNumber} text text_type_digits-large`}>
        {totalToday}
      </p>
    </div>
  );
};

export default OrdersInfo;
