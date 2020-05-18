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
