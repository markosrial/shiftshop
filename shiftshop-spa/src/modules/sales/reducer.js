import {combineReducers} from 'redux';

import * as actionTypes from './actionTypes';

import SearchDirection from '../common/constants/SearchDirection';
import SaleOrderBy from './constants/SaleOrderBy';

const initialState = {
    searchFilter: {
        orderBy: SaleOrderBy.DATE,
        direction: SearchDirection.DESC
    },
    salesSearch: null,
    sale: null
};

const searchFilter = (state = initialState.searchFilter, action) => {

    switch (action.type) {

        case actionTypes.CHANGE_ORDER_BY:
            return {...state, orderBy: action.orderBy};

        case actionTypes.CHANGE_DIRECTION:
            return {...state, direction: action.direction};

        default:
            return state;
    }

};


const salesSearch = (state = initialState.salesSearch, action) => {

    switch (action.type) {

        case actionTypes.FIND_SALES_COMPLETED:
            return action.salesSearch;

        case actionTypes.CLEAR_SALES_SEARCH:
            return initialState.salesSearch;

        default:
            return state;
    }

};


const sale  = (state = initialState.sale, action) => {

    switch (action.type) {

        case actionTypes.GET_SALE_COMPLETED:
            return action.sale;

        case actionTypes.CLEAR_SALE:
            return initialState.sale;

        default:
            return state;

    }

};

const reducer = combineReducers({
    searchFilter,
    salesSearch,
    sale
});

export default reducer;
