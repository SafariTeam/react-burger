import React from "react";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from "./AppHeader.module.css";
import { Link, useLocation } from "react-router-dom";

export default function AppHeader() {
    const location = useLocation();
    return (
        <header className={`${style.root} p-4`}>
            <nav>
               <Link to='/' className={`${location.pathname === '/' ? style.active : style.link} ml-2 pl-5 pr-5 text text_type_main-small`}>
                    <BurgerIcon type="primary"/>
                    <p className="pl-2">Конструктор</p>
                </Link>
                <a href="#" className={`${style.link} ml-2 pl-5 pr-5 text text_type_main-small`}>
                    <ListIcon type="secondary" />
                    <p className="pl-2">Лента заказов</p>
                </a>
            </nav>
            <Logo/>
            <Link to='/profile' className={`${location.pathname === '/login' || location.pathname === '/profile' ? style.active : style.link} pl-5 pr-5 text text_type_main-small`}>
                <ProfileIcon type="secondary"/>
                <p className="pl-2">Личный кабинет</p>
            </Link>
        </header>
    );
}