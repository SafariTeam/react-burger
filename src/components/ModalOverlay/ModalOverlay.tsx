import React, { FC } from "react";
import style from './ModalOverlay.module.css';

const ModalOverlay: FC<{onClose: Function}> = ({onClose}) => {
    return (
        <div className={style.overlay} onClick={()=>onClose()}></div>
    )
};

export default ModalOverlay;