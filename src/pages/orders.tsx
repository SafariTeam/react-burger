import styles from './page.module.css';
import { Logout } from '../services/actions/profile';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from '../services/store';
import OrderListProfile from '../components/OrderList/OrderListProfile';
import { useEffect } from 'react';
import { WSCloseUser, WSStartUser } from '../services/actions/feedUser';
import { getCookie } from '../utils/cookies';

export default function OrdersPage () {
    const accessToken = getCookie('authToken') as string;
    const token = accessToken.split('Bearer ')[1];
    const dispatch = useDispatch();
    const setLogout = () => {
        dispatch(Logout());
    }
    const location = useLocation();
    useEffect(() => {
        if(location.pathname.startsWith('/profile/'))
            dispatch(WSStartUser(token));
        else
            return () => {dispatch(WSCloseUser());}
    },[location.pathname,dispatch]);
    return (
        <div className={styles.contentWrapper}>
          <div className={styles.ProfileWrapper}>
            <div className={`${styles.navigationa} mr-15`}>
              <ul className="text text_type_main-medium">
                <li>
                  <Link to="/profile">
                    Профиль
                  </Link>
                </li>
                <li>
                  <Link className={styles.active} to="/profile/orders">История заказов</Link>
                </li>
                <li>
                  <a href="#" onClick={setLogout}>
                    Выход
                  </a>
                </li>
              </ul>
              <span className={`text text_type_main-default ${styles.description}`}>
                В этом разделе вы можете изменить свои персональные данные
              </span>
            </div>
            <div className={styles.maxWrap}>
              <OrderListProfile/>
            </div>
          </div>
        </div>
      );
}