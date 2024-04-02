import styles from './page.module.css';
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { UpdatePassword } from '../services/actions/profile';

export default function ResetPassword() {
    const dispatch = useDispatch();
    const {message} = useSelector(store => store.profile);
    const [restorationData,setData] = useState({password: '', token: ''});

    const Submit = e => {
        dispatch(UpdatePassword(restorationData));
        e.preventDefault();
    }

    const onChange = e => {
        setData({...restorationData, [e.target.name]: e.target.value});
        e.preventDefault();
    }

    if(message === 'Password successfully reset')
        return (<Navigate to='/login' replace={true}/>);

    if(!sessionStorage.getItem('passwordRequested'))
        return (<Navigate to='/' replace={true}/>);
        

    return (
        <div className={styles.contentWrapper}>
            <div>
                <span className='text text_type_main-medium mb-6'>Восстановление пароля</span>
                <form onSubmit={Submit}>
                    <PasswordInput value={restorationData.password} name='password' onChange={onChange}/>
                    <Input type='text' placeholder='Введите код из письма' name='token' value={restorationData.token} onChange={onChange}/>
                    <Button htmlType='submit'>Сохранить</Button>
                </form>
                <span className='text text_type_main-small text_color_inactive mt-20'>Вспомнили пароль? 
                    <Link to='/login' className='text text_type_main-small ml-3'>Войти</Link>
                </span>
            </div>
        </div>
    )
}