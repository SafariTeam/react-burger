import React, { useRef, useCallback, FC } from "react";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./ConstructorItem.module.css";
import { useDispatch } from "react-redux";
import { DELETE_ITEM, MOVE_ITEM } from "../../services/actions/ingredients";
import { DragSourceMonitor, useDrag, useDrop } from 'react-dnd';
import type { Identifier, XYCoord } from 'dnd-core';
import { TIngredient } from "../BurgerIngredients/Ingredient";

type TCItem = {
  item: TIngredient;
  isDraggable: boolean;
  isLocked?: boolean;
  type?: "bottom" | "top" | undefined;
  index?: number;
  dragIndex: number;
};

const ConstructorItem: FC<TCItem> = ({ item, isDraggable, isLocked, type, index, dragIndex }) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop<TCItem, void, { handlerId: Identifier | null }>({
    accept: 'aingredient',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(itm: TCItem, monitor) {
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
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      if (dragIndex != undefined && hoverIndex != undefined) {
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return
        }
      }
      if (hoverIndex != undefined) {
        if (drgIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }
        moveCard(drgIndex, hoverIndex, item);
        itm.dragIndex = hoverIndex;
      }
    }
  });

  const moveCard = useCallback((dragIndex: number, hoverIndex: number, item: TIngredient) => {
    dispatch({ type: MOVE_ITEM, dragIndex: dragIndex, hoverIndex: hoverIndex, item: { ...item, dragIndex } });
  }, [dispatch]);

  const [{ opacity }, drag] = useDrag({
    type: 'aingredient',
    item: () => {
      return { ...item }
    },
    collect: (monitor: DragSourceMonitor) => ({
      opacity: monitor.isDragging() ? 0 : 1
    }),
  });

  const deleteItem = () => {
    dispatch({ type: DELETE_ITEM, item: { ...item, index } });
  };

  const extraStyle = !isLocked ? undefined : style.drag100;
  drag(drop(ref));
  return (
    <div className={style.dragItem} style={{ opacity }} ref={ref} data-handler-id={handlerId}>
      {isDraggable && <div className="mr-6" style={{ width: '32px' }}>
        <DragIcon type="primary" />
      </div>}
      <div style={{ width: '100%' }}>
        <ConstructorElement
          type={type}
          text={`${item.name} ${type === 'top' ? '(верх)' : type === 'bottom' ? '(низ)' : ''}`}
          price={item.price}
          thumbnail={item.image_mobile}
          extraClass={extraStyle}
          isLocked={isLocked}
          handleClose={deleteItem}
        />
      </div>
    </div>
  )
}

export default ConstructorItem;