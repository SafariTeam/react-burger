import styles from './page.module.css';
import { Input, Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate } from 'react-router-dom';
import { register } from '../services/actions/profile';
import { ChangeEventHandler, useState } from 'react';
import { useDispatch, useSelector } from '../services/store';

//Тип будет помещен в редюсер
type TUser = {
    name: string;
    email: string;
    password: string;
};

export default function RegisterPage () {
    const dispatch = useDispatch();
    const { user, success, isError, message } = useSelector(state => state.profile);
    const [reguser, setUser] = useState<TUser>({email: '', password: '', name: ''});

    const Submit: ChangeEventHandler<HTMLFormElement> = e => {
        dispatch(register(reguser));
        e.preventDefault();
    }

    const onChange: ChangeEventHandler<HTMLInputElement> = e => {
        setUser({...reguser, [e.target.name]: e.target.value});
        e.preventDefault();
    }

    if(success && user)
        return(<Navigate to='/' replace={true}/>)

    return (
        <div className={styles.contentWrapper}>
            <div>
                <span className='text text_type_main-medium mb-6'>Регистрация</span>
                <form onSubmit={Submit}>
                    <Input value={reguser.name} type='text' placeholder='Имя' onChange={onChange} name='name'/>
                    <EmailInput value={reguser.email} name='email' isIcon={false} onChange={onChange}/>
                    <PasswordInput value={reguser.password} name='password' onChange={onChange}/>
                    <Button htmlType='submit'>Зарегистрироваться</Button>
                </form>
                {isError && message && <span className='text text_type_main-small text_color_inactive mt-1'>{message}</span>}
                <span className='text text_type_main-small text_color_inactive mt-20'>Уже зарегистрированы? 
                    <Link to='/login' className='text text_type_main-small ml-3'>Войти</Link>
                </span>
            </div>
        </div>
    )
}