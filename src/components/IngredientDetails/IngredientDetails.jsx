import React from "react";
import style from './IngredientDetails.module.css';
import PropTypes from 'prop-types';
import IngredientsTypes from "../../utils/IngredientsTypes";

const IngredientDetails = ({ingredient}) => {
    return (
        <div className={`${style.contentWrap} mb-15`}>
            <div className={`${style.image} mb-4`}>
                <img src={ingredient.image_large}/>
            </div>
            <span className="text text_type_main-medium">{ingredient.name}</span>
            <div className={`${style.ingredientDataBlock} mt-8`}>
                <div className={style.ingredientData}>
                    <span className="text text_type_main-default text_color_inactive pb-5">Калории, ккал</span>
                    <span className="text text_type_digits-default text_color_inactive">{ingredient.calories}</span>
                </div>
                <div className={style.ingredientData}>
                    <span className="text text_type_main-default text_color_inactive pb-5">Белки, г</span>
                    <span className="text text_type_digits-default text_color_inactive">{ingredient.proteins}</span>
                </div>
                <div className={style.ingredientData}>
                    <span className="text text_type_main-default text_color_inactive pb-5">Жиры, г</span>
                    <span className="text text_type_digits-default text_color_inactive">{ingredient.fat}</span>
                </div>
                <div className={style.ingredientData}>
                    <span className="text text_type_main-default text_color_inactive pb-5">Углеводы, г</span>
                    <span className="text text_type_digits-default text_color_inactive">{ingredient.carbohydrates}</span>
                </div>
            </div>
        </div>
    )
};

IngredientDetails.prototype = {
    ingredient: PropTypes.shape(IngredientsTypes).isRequired
}

export default IngredientDetails;