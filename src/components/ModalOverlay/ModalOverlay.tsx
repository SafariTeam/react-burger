import React, { FC } from "react";
import style from './ModalOverlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay: FC<{onClose: Function}> = ({onClose}) => {
    return (
        <div className={style.overlay} onClick={()=>onClose()}></div>
    )
};

ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired
}

export default ModalOverlay;