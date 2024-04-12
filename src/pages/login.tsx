import styles from './page.module.css';
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ChangeEventHandler, DetailedHTMLProps, FormEventHandler, FormHTMLAttributes, useState } from 'react';
import { AuthUser } from '../services/actions/profile';

export default function LoginPage() {
    const dispatch = useDispatch();
    const [loginuser, setUser] = useState<{email: string, password: string}>({email: '', password: ''});

    const Submit: ChangeEventHandler<HTMLFormElement> = e => {
        // @ts-ignore
        dispatch(AuthUser(loginuser));
        e.preventDefault();
    }

    const onChange: ChangeEventHandler<HTMLInputElement> = e => {
        setUser({...loginuser, [e.target.name]: e.target.value});
        e.preventDefault();
    }

    return (
        <div className={styles.contentWrapper}>
            <div>
                <span className='text text_type_main-medium mb-6'>Вход</span>
                <form onSubmit={Submit}>
                    <Input type='email' placeholder='E-mail' name='email' value={loginuser.email} onChange={onChange}/>
                    <PasswordInput value={loginuser.password} name='password' onChange={onChange}/>
                    <Button htmlType='submit'>Войти</Button>
                </form>
                <span className='text text_type_main-small text_color_inactive mt-20'>Вы &mdash; новый пользователь? 
                <Link to='/register' className='text text_type_main-small ml-3'>Зарегистрироваться</Link>
                </span>
                <span className='text text_type_main-small text_color_inactive mt-4'>Забыли пароль? 
                    <Link to='/forgot-password' className='text text_type_main-small ml-3'>Восстановить пароль</Link>
                </span>
            </div>
        </div>
    )
}