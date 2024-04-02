import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './BurgerIngredients.module.css';
import Ingredient from "./Ingredient";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../../services/actions/ingredients";

const getIngredients = state => state.ingredients.items;

const BurgerIngredients = () =>
{
    const mainRef = useRef(null);
    const bunRef = useRef(null);
    const sauceRef = useRef(null);
    const fillingRef = useRef(null);
    const dispatch = useDispatch();
    const ingredients = useSelector(getIngredients);
    const activeTab = useSelector(state => state.ingredients.activeTab);

    const pickTab = (value) => {
        setScroll(value);
    };

    useEffect(()=>{
        if(mainRef && mainRef.current) {
            mainRef.current.addEventListener("scroll",getScroll);
            return () => {mainRef.current?.removeEventListener('scroll',getScroll)}
        }
    },[]);

    const getScroll = () => {
        const wrapper = mainRef.current;
        const tabBun = bunRef.current.offsetTop - wrapper.offsetTop;
        const tabSauce = sauceRef.current.offsetTop - wrapper.offsetTop;
        const tabFilling = fillingRef.current.offsetTop - wrapper.offsetTop;
 
        if(wrapper.scrollTop < tabSauce && wrapper.scrollTop === tabBun)
            dispatch(setActiveTab('bun'));
        if(wrapper.scrollTop <= tabFilling && wrapper.scrollTop > tabBun)
            dispatch(setActiveTab('sauce'));
        if(wrapper.scrollTop >= tabFilling)
            dispatch(setActiveTab('filling'));
        
    };

    const setScroll = (node) => {
        const mainNode = mainRef.current;
        let activeNode = node === 'bun' ? bunRef.current : node === 'sauce' ? sauceRef.current : node === 'filling' ? fillingRef.current : null;
        mainNode.scrollTo({
            top: activeNode.offsetTop - mainNode.offsetTop
        });
        dispatch(setActiveTab(node));
    };

    const iGroups = useMemo(()=>{
        //return Object.groupBy(ingredients, ({type}) => type);
        return {
            bun: ingredients?.filter((ingredient) => ingredient.type === 'bun'),
            sauce: ingredients?.filter((ingredient) => ingredient.type === 'sauce'),
            main: ingredients?.filter((ingredient) => ingredient.type === 'main')
        }
    },[ingredients]);
    
    return (
        <section className={`${style.main} mr-10`}>
            <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
            <div className={style.navigation}>
                <Tab value="bun" active={activeTab === "bun"} onClick={pickTab}>Булки</Tab>
                <Tab value="sauce" active={activeTab === "sauce"} onClick={pickTab}>Соусы</Tab>
                <Tab value="filling" active={activeTab === "filling"} onClick={pickTab}>Начинки</Tab>
            </div>
            <div className={`${style.contentwrap} mt-10 mb-10 ml-4`} id="ingredients" ref={mainRef}>
                {ingredients.length > 0 && iGroups && <div className={style.ingredientwrap}>
                    <h2 className="text text_type_main-medium mb-6" id="bun" ref={bunRef}>Булки</h2>
                    {iGroups.bun.map((data, index) => <Ingredient key={data._id} data={{...data}}/>)}
                    <h2 className="text text_type_main-medium mb-6" id="sauce" ref={sauceRef}>Соусы</h2>
                    {iGroups.sauce.map((data, index) => <Ingredient key={data._id} data={data}/>)}
                    <h2 className="text text_type_main-medium mb-6" id="filling" ref={fillingRef}>Начинки</h2>
                    {iGroups.main.map((data, index) => <Ingredient key={data._id} data={data}/>)}
                </div>}
            </div>
        </section>
    )
};

export default BurgerIngredients;