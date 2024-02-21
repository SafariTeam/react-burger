import React from "react";
import {Counter, CurrencyIcon , Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './BurgerIngredients.module.css';
import PropTypes from 'prop-types';

const ingredientsPropTypes = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired
});

const Ingredient = ({ data, count }) => (
    <div className={style.burgerdata + ' mr-6 mb-8'}>
        {count > 0 && <Counter size="small"/>}
        <img src={data.image}/>
        <span className={style.price + ' m-1 text text_type_digits-default'}>
            <span className="pr-3">{data.price}</span>
            <CurrencyIcon type="primary" />
        </span>
        <span style={{textAlign: 'center'}}>{data.name}</span>
    </div>
);

const BurgerIngredients = ({ingredients}) =>
{
    const ingredientsGroup = Object.groupBy(ingredients, ({type}) => type);
    return (
        <section className="mr-10" style={{display: 'flex', flexDirection: 'column'}}>
            <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
            <div className={style.navigation}>
                <Tab value="one" active={true} onClick={()=>{}}>Булки</Tab>
                <Tab value="two" active={false} onClick={()=>{}}>Соусы</Tab>
                <Tab value="three" active={false} onClick={()=>{}}>Начинки</Tab>
            </div>
            <div className={`${style.contentwrap} mt-10 mb-10 ml-4`}>
                <div className={style.ingredientwrap}>
                    <h2 className="text text_type_main-medium mb-6" style={{width: '100%'}}>Булки</h2>
                    {ingredientsGroup.bun.map((data, index) => <Ingredient key={index} data={data}/>)}
                    <h2 className="text text_type_main-medium mb-6" style={{width: '100%'}}>Соусы</h2>
                    {ingredientsGroup.sauce.map((data, index) => <Ingredient key={index} data={data}/>)}
                    <h2 className="text text_type_main-medium mb-6" style={{width: '100%'}}>Начинки</h2>
                    {ingredientsGroup.main.map((data, index) => <Ingredient key={index} data={data}/>)}
                </div>
            </div>
        </section>
    )
};

BurgerIngredients.prototype = {
    ingredients: PropTypes.arrayOf(ingredientsPropTypes).isRequired
};

Ingredient.prototype = {
    img: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired
}

export default BurgerIngredients;