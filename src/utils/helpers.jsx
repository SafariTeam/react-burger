import {URL} from './appsettings';

const orderSum = (items, bun, cost) => {
    const bunConst = bun ? bun : 0;
    return bunConst + items.reduce((a,b) => {
        return a + b[cost];
    },0)
};

const setScroll = (wrapper,node) => {
    const mainNode = document.getElementById(wrapper);
    const activeNode = document.getElementById(node);
    mainNode.scrollTo({
        top: activeNode.offsetTop - mainNode.offsetTop,
        behavior: "smooth"
    });
};

const generateKey = (pre) => {
    return `${pre}_${new Date().getTime()}`;
}

const checkConnection = (res) => {
    return res.ok ? res.json() : res.json().then(err => Promise.reject(err))
}

const getIngredients = () => {
    return fetch(`${URL}/ingredients`)
    .then(res => checkConnection(res))
    .then((data) => {
        if (data?.success) return data.data;
        return Promise.reject(data);
    });
};

const sendOrder = (orderData) => {
    const body = {ingredients: orderData.map((item) => { return item._id})};
    return fetch(`${URL}/orders`,{
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(res => checkConnection(res))
    .then((data) => {
        console.log(data);
        if (data?.success) return data;
        return Promise.reject(data);
    });
};

export {orderSum, setScroll, generateKey, getIngredients, sendOrder};