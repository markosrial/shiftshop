export const minDelayFunction = timeout => {

    const delay = new Promise(resolve => setTimeout(resolve, timeout));

    return func => delay.then(func);

};
