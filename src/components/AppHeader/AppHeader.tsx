import React from "react";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from "./AppHeader.module.css";

export default function AppHeader() {
    return (
        <header className={`${style.root} p-4`}>
            <nav>
                <button type="button" className={`${style.active} ml-2 pl-5 pr-5 text text_type_main-small`}>
                    <BurgerIcon type="primary"/>
                    <p className="pl-2">Конструктор</p>
                </button>
                <button type="button" className="ml-2 pl-5 pr-5 text text_type_main-small">
                    <ListIcon type="secondary" />
                    <p className="pl-2">Лента заказов</p>
                </button>
            </nav>
            <Logo/>
            <button type="button" className="pl-5 pr-5 text text_type_main-small">
                <ProfileIcon type="secondary"/>
                <p className="pl-2">Личный кабинет</p>
            </button>
        </header>
    );
}