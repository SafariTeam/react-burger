import { useEffect } from 'react';
import OrdersInfo from '../components/OrdersInfo';
import styles from './page.module.css';
import { useDispatch, useSelector } from '../services/store';
import { WSClose, WSStart } from '../services/actions/feed';
import { useLocation } from 'react-router';
import OrderList from '../components/OrderList/OrderList';

export default function Feed() {
    const location = useLocation();
    const dispatch = useDispatch();
    useEffect(() => {
        if(location.pathname.startsWith('/feed'))
            dispatch(WSStart());
        else
            return () => {dispatch(WSClose());}
    },[location.pathname,dispatch]);

    const { total, totalToday, orders } = useSelector(state => state.feed);
    
    return (
        <div>
            <div className={styles.title}>
                <span className='text text_type_main-large mt-10 mb-2'>Лента заказов</span>
            </div>
            <div className={styles.feedWrapper}>
                <OrderList/>
                <OrdersInfo total={total} totalToday={totalToday} orders={orders}/>
            </div>
        </div>
    )
}