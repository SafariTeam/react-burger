const url = 'https://norma.nomoreparties.space/api';

const checkResponse = (res) => {
    return res?.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

const checkSuccess = (res) => {
    return res?.success ? res : Promise.reject(`Ответ не success: ${res}`);
};

export const request = (endpoint, data) => {
    return fetch(`${url}/${endpoint}`,data)
    .then(checkResponse)
    .then(checkSuccess);
};