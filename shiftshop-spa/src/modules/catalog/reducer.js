import {combineReducers} from "redux";

import * as actionTypes from './actionTypes';

import SearchDirection from '../common/constants/SearchDirection';
import ProductOrderBy from './constants/ProductOrderBy';

const initialState = {
    categories: [],
    searchFilter: {
        orderBy: ProductOrderBy.NAME,
        order: SearchDirection.ASC,
        onlyActive: true
    },
    productsSearch: null,
    product: null,
};

const categories = (state = initialState.categories, action) => {

    switch (action.type) {

        case actionTypes.FIND_ALL_CATEGORIES_COMPLETED:
            return action.categories;

        default:
            return state;
    }

};

const searchFilter = (state = initialState.searchFilter, action) => {

    switch (action.type) {

        case actionTypes.CHANGE_SEARCH_FILTERS:
            return action.searchFilter;

        case actionTypes.RESET_SEARCH_FILTERS:
            return initialState.searchFilter;

        default:
            return state;
    }

};

const productsSearch = (state = initialState.productsSearch, action) => {

    switch (action.type) {

        case actionTypes.FIND_PRODUCTS_COMPLETED:
            return action.productsSearch;

        case actionTypes.CLEAR_PRODUCTS_SEARCH:
            return initialState.productsSearch;

        default:
            return state;
    }

};

const product  = (state = initialState.product, action) => {

    switch (action.type) {

        case actionTypes.GET_PRODUCT_COMPLETED:
            return action.product;

        case actionTypes.SET_PRODUCT_ACTIVE_COMPLETED:
            return state ? {...state, active: true} : initialState.product;

        case actionTypes.SET_PRODUCT_INACTIVE_COMPLETED:
            return state ? {...state, active: false} : initialState.product;

        case actionTypes.CLEAR_PRODUCT:
            return initialState.product;

        default:
            return state;

    }

};

const reducer = combineReducers({
    categories,
    searchFilter,
    productsSearch,
    product
});

export default reducer;
