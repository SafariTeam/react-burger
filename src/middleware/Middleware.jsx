export const customMiddleware =
    () =>
    (store) =>
    (next) =>
    (action) => {
        console.log('store after dispatch', store);
        console.log('will dispatch', action);
        console.log('dispatch', next);

        if (typeof action === 'function') {
           return action(next, store)
        }

        return next(action);
    }