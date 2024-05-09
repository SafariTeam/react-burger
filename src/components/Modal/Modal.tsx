import React, { FC, ReactElement, useEffect } from "react";
import { createPortal } from 'react-dom';
import style from './Modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from "../ModalOverlay";

type TModal = {
    title?: string;
    children: ReactElement;
    onClose: Function;
};

const Modal: FC<TModal> = (props) => {
    const modal = document.getElementById('modals') as HTMLElement;
    const { title, children, onClose } = props;

    useEffect(() => {
        document.addEventListener('keydown', closeModal);
        return () => { document.removeEventListener('keydown', closeModal); };
    }, []);

    function closeModal(e: KeyboardEvent) {
        if (e.key === "Escape") {
            onClose();
        }
    };

    return createPortal(
        <>
            <ModalOverlay onClose={() => onClose()} />
            <div className={`${style.modal}`}>
                <div className={`${style.header} m-10`}>
                    <p className={`${style.title} text text_type_main-large`}>{title}</p>
                    <div className={style.close}>
                        <CloseIcon type="primary" onClick={() => onClose()} />
                    </div>
                </div>
                {children}
            </div>
        </>, modal
    )
};

export default Modal;