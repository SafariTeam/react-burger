import React, { useRef, useCallback } from "react";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./ConstructorItem.module.css";
import PropTypes from 'prop-types';
import IngredientsTypes from '../../utils/IngredientsTypes';
import { useDispatch } from "react-redux";
import { DELETE_ITEM, MOVE_ITEM } from "../../services/actions/ingredients";
import { useDrag, useDrop } from 'react-dnd'

const ConstructorItem = ({ item, isDraggable, isLocked, type, index, dragIndex }) => {
    const dispatch = useDispatch();
    const ref = useRef(null);

    const [{ handlerId }, drop] = useDrop({
        accept: 'aingredient',
        collect(monitor) {
          return {
            handlerId: monitor.getHandlerId(),
          }
        },
        hover(itm, monitor) {
            if (!ref.current) {
              return;
            }
            const drgIndex = itm.dragIndex;
            const hoverIndex = dragIndex;
            if (drgIndex === hoverIndex) {
              return
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
              return
            }
            if (drgIndex > hoverIndex && hoverClientY > hoverMiddleY) {
              return;
            }
            moveCard(drgIndex, hoverIndex, item);
            itm.dragIndex = hoverIndex;
        }
    });

    const moveCard = useCallback((dragIndex, hoverIndex, item) => {
        dispatch({type: MOVE_ITEM, dragIndex: dragIndex, hoverIndex: hoverIndex, item: {...item,dragIndex}});
    }, [dispatch]);

    const [{ opacity }, drag] = useDrag({
        type: 'aingredient',
        item: () => {
          return { ...item }
        },
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0 : 1
        }),
    });

    const deleteItem = () => {
        console.log(index);
        dispatch({type: DELETE_ITEM, item: {...item, index}});
    };

    const extraStyle = !isLocked ? null : {with: '100%'};
    drag(drop(ref));
    return (
        <div className={style.dragItem} style={{opacity}} ref={ref} data-handler-id={handlerId}>
            {isDraggable && <div className="mr-6" style={{width: '32px'}}>
                <DragIcon type="primary" />
            </div>}
            <div style={{width: '100%'}}>
                <ConstructorElement
                    type={type}
                    text={`${item.name} ${type === 'top' ? '(верх)' : type === 'bottom' ? '(низ)' : ''}`}
                    price={item.price}
                    thumbnail={item.image_mobile} 
                    style={extraStyle}
                    isLocked={isLocked}
                    handleClose={deleteItem}
                />
            </div>
        </div>
    )
}

ConstructorItem.propTypes = {
    item: IngredientsTypes.isRequired,
    isDraggable: PropTypes.bool.isRequired,
    isLocked: PropTypes.bool,
    type: PropTypes.string,
    index: PropTypes.string,
    dragIndex: PropTypes.number
}

export default ConstructorItem;