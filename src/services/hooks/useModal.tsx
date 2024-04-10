import { useState, useCallback } from "react";

export const useModal = () => {
    const [toggleModal, setToggleModal] = useState<boolean>(false);

    const openModal = useCallback(() => {
        setToggleModal(true);
    }, []);

    const closeModal = useCallback(() => {
        setToggleModal(false);
    }, []);

    return {
        toggleModal,
        openModal,
        closeModal
    };
};