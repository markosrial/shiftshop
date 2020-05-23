import * as actionTypes from './actionTypes';
import backend from '../../backend';

export const changeSearchOrderBy = (orderBy) => ({
    type: actionTypes.CHANGE_ORDER_BY,
    orderBy
});

export const changeSearchDirection = (direction) => ({
    type: actionTypes.CHANGE_DIRECTION,
    direction
});

const findSalesCompleted = salesSearch => ({
    type: actionTypes.FIND_SALES_COMPLETED,
    salesSearch
});

export const findSales = (criteria, onError, atFinally) => dispatch => {

    dispatch(clearSalesSearch());

    backend.saleService.findSales(criteria,
        result => dispatch(findSalesCompleted({criteria, result})),
        onError,
        atFinally);

};

export const previousFindSalesPage = (criteria, onError, atFinally) =>
    findSales({...criteria, page: criteria.page-1}, onError, atFinally);

export const nextFindSalesPage = (criteria, onError, atFinally) =>
    findSales({...criteria, page: criteria.page+1}, onError, atFinally);

export const clearSalesSearch = () => ({type: actionTypes.CLEAR_SALES_SEARCH});

const getSaleSuccess = sale => ({
    type: actionTypes.GET_SALE_COMPLETED,
    sale
});

export const getSale = (barcode, atFinally) => dispatch =>
    backend.saleService.findSaleByBarcode(barcode,
        sale => dispatch(getSaleSuccess(sale)),
        atFinally);

export const clearSale = () => ({type: actionTypes.CLEAR_SALE});

export const findFirstSaleBarcodes = (startingCode, onSuccess, atFinally) =>
    backend.saleService.findFirstSaleBarcodes(startingCode, onSuccess, atFinally);

const getBestSellingProductsCompleted = topBestSelling => ({
    type: actionTypes.GET_BEST_SELLING_PRODUCTS_COMPLETED,
    topBestSelling
});

export const getBestSellingProducts = () => dispatch =>
    backend.saleService.getBestSellingProducts(
        topBestSelling => dispatch(getBestSellingProductsCompleted(topBestSelling)))

const getProfitableProductsCompleted = topProfitable => ({
    type: actionTypes.GET_PROFITABLE_PRODUCTS_COMPLETED,
    topProfitable
});

export const getProfitableProducts = () => dispatch =>
    backend.saleService.getProfitableProducts(
        topProfitable => dispatch(getProfitableProductsCompleted(topProfitable)));

const getMonthSalesResumeCompleted = monthSalesResume => ({
    type: actionTypes.GET_MONTH_SALES_RESUME_COMPLETED,
    monthSalesResume
});

export const getMonthSalesResume = () => dispatch =>
    backend.saleService.getMonthSalesResume(
        salesResume => dispatch(getMonthSalesResumeCompleted(salesResume)));

const getYearSalesResumeCompleted = yearSalesResume => ({
    type: actionTypes.GET_YEAR_SALES_RESUME_COMPLETED,
    yearSalesResume
});

export const getYearSalesResume = () => dispatch =>
    backend.saleService.getYearSalesResume(
        salesResume => dispatch(getYearSalesResumeCompleted(salesResume)));
