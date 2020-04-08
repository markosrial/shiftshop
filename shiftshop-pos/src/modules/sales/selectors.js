const getModuleState = state => state.sales;

export const getCatalog = state =>
    getModuleState(state).catalog;

export const getShoppingCart = state =>
    getModuleState(state).shoppingCart;


export const getShoppingCartCount = state =>
    getModuleState(state).shoppingCart.length;
