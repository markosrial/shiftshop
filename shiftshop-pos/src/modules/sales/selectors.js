import { createSelector } from 'reselect';

const getModuleState = state => state.sales;

export const getCatalog = state =>
    getModuleState(state).catalog;

export const getProductById = (catalog, id) => {

    if (!catalog || !id) {
        return null;
    }

    const product = catalog.find(x => x.id === id);

    if (!product) {
        return null;
    }

    return product;

};

export const getShoppingCart = state =>
    getModuleState(state).shoppingCart;

export const getShoppingCartCount = createSelector(
    getShoppingCart,
    shoppingCart =>
        (shoppingCart.map(item => item.quantity)
            .reduce((a, b) => a + b, 0))
);


export const getShoppingCartSubtotal = createSelector(
    [ getCatalog, getShoppingCart ],
    (catalog, shoppingCart) => (shoppingCart.map(item => {

            const product = getProductById(catalog, item.id);

            if (product) {
                return (product.salePrice * item.quantity);
            }

            return 0;

        }).reduce((a, b) => a + b, 0))
);

