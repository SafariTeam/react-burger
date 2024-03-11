const orderSum = (items, bun, cost) => {
    const bunConst = bun ? bun : 0;
    return bunConst + items.reduce((a,b) => {
        return a + b[cost];
    },0)
};

const generateKey = (pre) => {
    return `${pre}_${new Date().getTime()}`;
}

export {orderSum, generateKey};