import React, {useEffect} from "react";
import { createPortal } from 'react-dom';
import style from './Modal.module.css';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import ModalOverlay from "../ModalOverlay";

const Modal = props => {
    const modal = document.getElementById('modals');
    const {title, children, onClose} = props;

    useEffect(()=>{
        document.addEventListener('keydown',closeModal);
        return () => {document.removeEventListener('keydown',closeModal);};
    },[]);

    function closeModal(e) {
        if (e.key === "Escape") {
            onClose();
        }
    };

    return createPortal (
        <>
            <ModalOverlay onClose={()=>onClose()}/>
            <div className={`${style.modal}`}>
                <div className={`${style.header} m-10`}>
                    <p className={`${style.title} text text_type_main-large`}>{title}</p>
                    <div className={style.close}>
                        <CloseIcon type="primary" onClick={()=>onClose()}/>
                    </div>
                </div>
                {children}
            </div>
        </>,modal
    )
};

Modal.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired
}

export default Modal;