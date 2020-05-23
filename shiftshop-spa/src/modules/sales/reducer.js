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
    sale: null,
    topBestSelling: null,
    topProfitable: null,
    monthSalesResume: null,
    yearSalesResume: null
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

const topBestSelling = (state = initialState.topBestSelling, action) => {

    switch (action.type) {

        case actionTypes.GET_BEST_SELLING_PRODUCTS_COMPLETED:
            return action.topBestSelling;

        default:
            return state;

    }

};

const topProfitable = (state = initialState.topProfitable, action) => {

    switch (action.type) {

        case actionTypes.GET_PROFITABLE_PRODUCTS_COMPLETED:
            return action.topProfitable;

        default:
            return state;

    }

};

const monthSalesResume = (state = initialState.monthSalesResume, action) => {

    switch (action.type) {

        case actionTypes.GET_MONTH_SALES_RESUME_COMPLETED:
            return action.monthSalesResume;

        default:
            return state;

    }

};

const yearSalesResume = (state = initialState.yearSalesResume, action) => {

    switch (action.type) {

        case actionTypes.GET_YEAR_SALES_RESUME_COMPLETED:
            return action.yearSalesResume;

        default:
            return state;

    }

};

const reducer = combineReducers({
    searchFilter,
    salesSearch,
    sale,
    topBestSelling,
    topProfitable,
    monthSalesResume,
    yearSalesResume
});

export default reducer;
