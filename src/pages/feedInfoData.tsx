import { useLocation } from 'react-router-dom';
import FeedOrderDetails from '../components/FeedOrderDetails';
import styles from './page.module.css';
import { useDispatch, useSelector } from '../services/store';
import { useEffect } from 'react';
import { WSClose, WSStart } from '../services/actions/feed';

export default function FeedInfo() {
    const location = useLocation();
    const dispatch = useDispatch();
    useEffect(() => {
        if(location.pathname.startsWith('/feed'))
            dispatch(WSStart());
        else
            return () => {dispatch(WSClose());}
    },[location.pathname,dispatch]);
    const {orders} = useSelector(store => store.feed);
    return (
        <div>
            {orders.length > 0 && <FeedOrderDetails/>}
        </div>
    )
}