import React from "react";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from "./AppHeader.module.css";

export default function AppHeader() {
    return (
        <header className={`${style.root} p-4`}>
            <nav>
                <a href="#" className={`${style.active} ml-2 pl-5 pr-5 text text_type_main-small`}>
                    <BurgerIcon type="primary"/>
                    <p className="pl-2">Конструктор</p>
                </a>
                <a href="#" className={`${style.link} ml-2 pl-5 pr-5 text text_type_main-small`}>
                    <ListIcon type="secondary" />
                    <p className="pl-2">Лента заказов</p>
                </a>
            </nav>
            <Logo/>
            <a href="#" className={`${style.link} pl-5 pr-5 text text_type_main-small`}>
                <ProfileIcon type="secondary"/>
                <p className="pl-2">Личный кабинет</p>
            </a>
        </header>
    );
}