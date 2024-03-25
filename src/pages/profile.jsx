import { useDispatch, useSelector } from 'react-redux';
import styles from './page.module.css';
import { Input, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Navigate } from 'react-router';
import { useEffect, useState } from 'react';
import { Logout, RequestUser, UpdateUser } from '../services/actions/profile';
import { getCookie } from '../utils/cookies';
import { Link } from 'react-router-dom';

export default function ProfilePage () {
    const dispatch = useDispatch();
    const {user} = useSelector(store => store.profile);
    const [userData,setUserData] = useState({name: '', email: '', password: ''});
    const [isEdit,setEdit] = useState(true);

    useEffect(()=> {
        user && setUserData({...user, name: user.name, email: user.email, password: getCookie('password')});
    },[]);

    const Submit = e => {
        dispatch(UpdateUser(userData));
        e.preventDefault();
    }

    const onChange = e => {
        setUserData({...userData, [e.target.name]: e.target.value});
        e.preventDefault();
    }

    const onEdit = e => {
        setEdit(!isEdit);
        e.preventDefault();
    }

    const setLogaut = () => {
        dispatch(Logout());
    }

    const isSubmit = e => {
        e.keyCode === 13 && Submit(e);
        setEdit(false);
        e.preventDefault();
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
                        <PasswordInput name='password' type='password' icon='EditIcon' value={userData.password} onChange={onChange} onKeyDown={isSubmit}/>
                    </form>
                </div>
            </div>
        </div>
    )
}