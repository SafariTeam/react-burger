import styles from './page.module.css';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { RestorePassword } from '../services/actions/profile';

export default function ForgotPassword() {
    const dispatch = useDispatch();
    const {message} = useSelector(store => store.profile);
    const [email,setEmail] = useState('');

    const Submit = e => {
        dispatch(RestorePassword(email));
        e.preventDefault();
    }

    const onChange = e => {
        setEmail(e.target.value);
        e.preventDefault();
    }

    if(message === 'Reset email sent')
    {
        sessionStorage.setItem('passwordRequested',true);
        return(<Navigate to='/reset-password' replace={true}/>);
    }

    return (
        <div className={styles.contentWrapper}>
            <div>
                <span className='text text_type_main-medium mb-6'>Восстановление пароля</span>
                <form onSubmit={Submit}>
                    <EmailInput type='email' placeholder='E-mail' name='email' value={email} onChange={onChange}/>
                    <Button htmlType='submit'>Восстановить</Button>
                </form>
                <span className='text text_type_main-small text_color_inactive mt-20'>Вспомнили пароль? 
                    <Link to='/login' className='text text_type_main-small ml-3'>Войти</Link>
                </span>
            </div>
        </div>
    )
}