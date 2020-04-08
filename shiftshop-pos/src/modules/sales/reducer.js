import {combineReducers} from 'redux';

import * as actionTypes from './actionTypes';

const initialState = {
    catalog: [],
    shoppingCart: []
};

const catalog = (state = initialState.catalog, action) => {

    switch (action.type) {

        case actionTypes.LOAD_CATALOG_COMPLETED:
            return action.catalog;

        default:
            return state;
    }

};

const shoppingCart = (state = initialState.shoppingCart, action) => {

    switch (action.type) {

        case actionTypes.ADD_TO_CART:

            const addProduct = state.find(item => item.id === action.productId);

            if (addProduct) {

                return state.map(
                    item => (item.id === action.productId)
                        ? {...item, quantity: ++item.quantity}
                        : item);

            }

            return [{id: action.productId, quantity: 1}, ...state];

        case actionTypes.REMOVE_FROM_CART:

            return state.filter(item => item.id !== action.productId);

        case actionTypes.SUBTRACT_PRODUCT_IN_CART:

            const subtractProduct = state.find(item => item.id === action.id);

            if (subtractProduct) {

                if (subtractProduct.quantity > 1) {

                    return state.map(
                        item => (item.id === action.productId)
                            ? {...item, quantity: --item.quantity}
                            : item);

                }

                return state.filter(item => item.id !== action.id);

            }

            return state;

        case actionTypes.CLEAR_CART:
            return initialState.shoppingCart;

        default:
            return state;
    }

};

const reducer = combineReducers({
    catalog,
    shoppingCart
});

export default reducer;
