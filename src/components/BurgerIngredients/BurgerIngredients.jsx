import React, { useEffect } from "react";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './BurgerIngredients.module.css';
import Ingredient from "./Ingredient";
import { setScroll } from "../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../../services/actions/ingredients";

const getIngredients = state => state.ingredients.items;

const BurgerIngredients = () =>
{
    const dispatch = useDispatch();
    const ingredients = useSelector(getIngredients);
    const activeTab = useSelector(state => state.ingredients.activeTab);

    const pickTab = (value) => {
        setScroll("ingredients",value);
        dispatch(setActiveTab(value));
    };

    useEffect(()=>{
        document.getElementById("ingredients").addEventListener("scroll",getScroll);
        return () => {document.removeEventListener('scroll',getScroll)};
    },[]);

    const getScroll = () => {
        const wrapper = document.getElementById("ingredients");
        const tabBun = document.getElementById("bun").offsetTop - wrapper.offsetTop;
        const tabSauce = document.getElementById("sauce").offsetTop - wrapper.offsetTop;
        const tabFilling = document.getElementById("filling").offsetTop - wrapper.offsetTop;
        if(wrapper.scrollTop >= tabFilling)
            dispatch(setActiveTab('filling'));
        if(wrapper.scrollTop <= tabFilling && wrapper.scrollTop > tabBun)
            dispatch(setActiveTab('sauce'));
        if(wrapper.scrollTop < tabSauce && wrapper.scrollTop === tabBun)
            dispatch(setActiveTab('bun'));
    };

    let iGroups = Object.groupBy(ingredients, ({type}) => type);
    
    return (
        <section className={`${style.main} mr-10`}>
            <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
            <div className={style.navigation}>
                <Tab value="bun" active={activeTab === "bun"} onClick={pickTab}>Булки</Tab>
                <Tab value="sauce" active={activeTab === "sauce"} onClick={pickTab}>Соусы</Tab>
                <Tab value="filling" active={activeTab === "filling"} onClick={pickTab}>Начинки</Tab>
            </div>
            <div className={`${style.contentwrap} mt-10 mb-10 ml-4`} id="ingredients">
                {ingredients.length > 0 && <div className={style.ingredientwrap}>
                    <h2 className="text text_type_main-medium mb-6" id="bun">Булки</h2>
                    {iGroups.bun.map((data, index) => <Ingredient key={data._id} data={data}/>)}
                    <h2 className="text text_type_main-medium mb-6" id="sauce">Соусы</h2>
                    {iGroups.sauce.map((data, index) => <Ingredient key={data._id} data={data}/>)}
                    <h2 className="text text_type_main-medium mb-6" id="filling">Начинки</h2>
                    {iGroups.main.map((data, index) => <Ingredient key={data._id} data={data}/>)}
                </div>}
            </div>
        </section>
    )
};

export default BurgerIngredients;