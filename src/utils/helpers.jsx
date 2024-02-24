const orderSum = (items, cost) => {
    return items.reduce((a,b) => {
        return a + b[cost];
    },0)
};

export {orderSum};