import * as actionTypes from './actionTypes';

import {ProductsDB} from '../../databases';

const loadCatalogCompleted = catalog => ({
    type: actionTypes.LOAD_CATALOG_COMPLETED,
    catalog
});

export const loadCatalog = onError => dispatch =>
    ProductsDB.init().then(productDB => productDB.getAll())
        .then(products => {

            const sortedProducts = products.sort(
                (a, b) => a.name.toUpperCase().localeCompare(b.name.toUpperCase()));

            dispatch(loadCatalogCompleted(sortedProducts));

        }).catch(onError);



export const addToCart = productId => ({
    type: actionTypes.ADD_TO_CART,
    productId
});


export const removeFromCart = productId => ({
    type: actionTypes.REMOVE_FROM_CART,
    productId
});

export const subtractProductInCart = productId => ({
    type: actionTypes.SUBTRACT_PRODUCT_IN_CART,
    productId
});

export const clearCart = () => ({type: actionTypes.CLEAR_CART});
