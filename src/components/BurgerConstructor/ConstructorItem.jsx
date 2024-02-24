import React from "react";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./ConstructorItem.module.css";
import PropTypes from 'prop-types';
import ingredientsPropTypes from '../../utils/IngredientsTypes';

const ConstructorItem = ({item}) => (
    <div className={style.dragItem}>
        <div className="mr-6" style={{width: '32px'}}>
            <DragIcon type="primary" />
        </div>
        <div style={{width: '100%'}}>
            <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image_mobile} 
                style={{with: '100%'}}
            />
        </div>
    </div>
);

ConstructorItem.prototype = {
    item: PropTypes.shape(ingredientsPropTypes).isRequired
}

export default ConstructorItem;