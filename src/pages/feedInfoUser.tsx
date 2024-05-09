import { useLocation } from 'react-router-dom';
import FeedOrderDetailsUser from '../components/FeedOrderDetails';
import { useDispatch, useSelector } from '../services/store';
import { useEffect } from 'react';
import { WSCloseUser, WSStartUser } from '../services/actions/feedUser';
import { getCookie } from '../utils/cookies';

export default function FeedInfoUser() {
    const accessToken = getCookie("authToken") as string;
    const token = accessToken?.split('Bearer ')[1];
    const location = useLocation();
    const dispatch = useDispatch();
    useEffect(() => {
        if (location.pathname.startsWith('/profile'))
            dispatch(WSStartUser(token));
        else
            return () => { dispatch(WSCloseUser()); }
    }, [location.pathname, dispatch]);
    const { orders } = useSelector(store => store.profileFeed);
    return (
        <div>
            {orders.length > 0 && <FeedOrderDetailsUser />}
        </div>
    )
}