import styles from './page.module.css';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { ChangeEventHandler, KeyboardEventHandler, useEffect, useState } from 'react';
import { Logout, UpdateUser } from '../services/actions/profile';
import { getCookie } from '../utils/cookies';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from '../services/store';

//Тип будет помещен в редюсер
type TUser = {
    name: string;
    email: string;
    password: string;
};

export default function ProfilePage () {
    const dispatch = useDispatch();
    const {user} = useSelector(store => store.profile);
    const [userData,setUserData] = useState<TUser>({name: '', email: '', password: ''});
    const [isEdit,setEdit] = useState(true);
    const [displayButtons,setDisplay] = useState(false);

    useEffect(()=> {
        const pwd = getCookie('password');
        user && setUserData({...user, name: user.name, email: user.email, password: pwd !== undefined ? pwd : ''});
        
    },[]);

    useEffect(()=>{
        user && setDisplay(user.name != userData.name || user.email != userData.email || userData.password != getCookie('password'));
    }, [user, userData]);

    function submitData(): void {
        dispatch(UpdateUser(userData));
    }

    function restoreData(): void {
      user && setUserData({name: user.name, password: getCookie('password') as string, email: user.email});
    }

    const Submit: ChangeEventHandler<HTMLFormElement> = e => {
        submitData();
        e.preventDefault();
    }

    const onChange: ChangeEventHandler<HTMLInputElement> = e => {
        setUserData({...userData, [e.target.name]: e.target.value});
        e.preventDefault();
    }

    const onEdit = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setEdit(!isEdit);
        e.preventDefault();
    }

    const setLogout = () => {
        dispatch(Logout());
    }

    const isSubmit: KeyboardEventHandler<HTMLInputElement> = e => {
        if(e.key === "Enter")
        {
            submitData();
            setEdit(false);
        }
    }

    return (
        <div className={styles.contentWrapper}>
          <div className={styles.ProfileWrapper}>
            <div className={`${styles.navigation} mr-15`}>
              <ul className="text text_type_main-medium">
                <li>
                  <Link className={styles.active} to="/profile">
                    Профиль
                  </Link>
                </li>
                <li>
                  <Link to="/profile/orders">История заказов</Link>
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
            <div>
              <form onSubmit={Submit}>
                <Input
                  type="text"
                  placeholder="Имя"
                  icon="EditIcon"
                  name="name"
                  value={userData.name}
                  onChange={onChange}
                  readOnly={isEdit}
                  onIconClick={onEdit}
                  onKeyDown={isSubmit}
                />
                <EmailInput
                  name="email"
                  isIcon={true}
                  value={userData.email}
                  onChange={onChange}
                  onKeyDown={isSubmit}
                />
                <PasswordInput
                  name="password"
                  icon="EditIcon"
                  value={userData.password}
                  onChange={onChange}
                  onKeyDown={isSubmit}
                />
                {/* кнопки, которых я не вижу в дизайне хоть убей */}
                {displayButtons && <div className={styles.profilebuttons}>
                  <Button htmlType="submit">Сохранить</Button>
                  <Button htmlType="button" type='secondary' onClick={restoreData}>Отмена</Button>
                </div>}
              </form>
            </div>
          </div>
        </div>
      );
}