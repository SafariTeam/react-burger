import React from "react";
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './Ingredient.module.css';

const Ingredient = ({ data, count }) => (
    <div className={style.burgerdata + ' mr-6 mb-8'}>
        {count > 0 && <Counter size="small"/>}
        <img src={data.image}/>
        <span className={'m-1 text text_type_digits-default'}>
            <span className="pr-3">{data.price}</span>
            <CurrencyIcon type="primary" />
        </span>
        <span style={{textAlign: 'center'}}>{data.name}</span>
    </div>
);

export default Ingredient;