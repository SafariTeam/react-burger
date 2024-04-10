import { useDispatch, useSelector } from 'react-redux';
import styles from './page.module.css';
import { Input, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { ChangeEvent, ChangeEventHandler, EventHandler, KeyboardEventHandler, useEffect, useState } from 'react';
import { Logout, UpdateUser } from '../services/actions/profile';
import { getCookie } from '../utils/cookies';
import { Link } from 'react-router-dom';

//Тип будет помещен в редюсер
type TUser = {
    name: string;
    email: string;
    password: string;
};

export default function ProfilePage () {
    const dispatch = useDispatch();
    const {user} = useSelector((store: any) => store.profile);
    const [userData,setUserData] = useState<TUser>({name: '', email: '', password: ''});
    const [isEdit,setEdit] = useState<boolean>(true);

    useEffect(()=> {
        user && setUserData({...user, name: user.name, email: user.email, password: getCookie('password')});
    },[]);

    function submitData(): void {
        // @ts-ignore
        dispatch(UpdateUser(userData));
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

    const setLogaut = () => {
        // @ts-ignore
        dispatch(Logout());
    }

    const isSubmit: KeyboardEventHandler<HTMLInputElement> = e => {
        if(e.keyCode === 13)
        {
            submitData();
            setEdit(false);
        }
    }

    return (
        <div className={styles.contentWrapper}>
            <div className={styles.ProfileWrapper}>
                <div className={`${styles.navigation} mr-15`}>
                    <ul className='text text_type_main-medium'>
                        <li><Link className={styles.active} to='/profile'>Профиль</Link></li>
                        <li><a href='#'>История заказов</a></li>
                        <li><a href='#' onClick={setLogaut}>Выход</a></li>
                    </ul>
                    <span className={`text text_type_main-default ${styles.description}`}>В этом разделе вы можете изменить свои персональные данные</span>
                </div>
                <div>
                    <form onSubmit={Submit}>
                        <Input type='text' placeholder='Имя' icon='EditIcon' name='name' value={userData.name} onChange={onChange} readOnly={isEdit} onIconClick={onEdit} onKeyDown={isSubmit}/>
                        <EmailInput name='email' isIcon={true} value={userData.email} onChange={onChange} onKeyDown={isSubmit}/>
                        <PasswordInput name='password' icon='EditIcon' value={userData.password} onChange={onChange} onKeyDown={isSubmit}/>
                    </form>
                </div>
            </div>
        </div>
    )
}