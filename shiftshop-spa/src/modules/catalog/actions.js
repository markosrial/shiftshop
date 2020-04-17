import * as actionTypes from './actionTypes';
import backend from '../../backend';

export const addCategory = (category, onSuccess, onError, atFinally) => dispatch =>
    backend.catalogService.addCategory(category,
        category => {
            onSuccess(category.name);
            dispatch(findAllCategories());
        },
        onError,
        atFinally);

const findAllCategoriesCompleted = categories => ({
    type: actionTypes.FIND_ALL_CATEGORIES_COMPLETED,
    categories
});

export const findAllCategories = () => dispatch =>
    backend.catalogService.findAllCategories(
        categories => dispatch(findAllCategoriesCompleted(categories))
    );

export const updateCategory = (id, data, onSuccess, onError, atFinally) => dispatch =>
    backend.catalogService.updateCategory(id, data,
        category => {
            onSuccess(category.name);
            dispatch(findAllCategories());
        },
        onError,
        atFinally);

export const addProduct = (product, onSuccess, onError, atFinally) =>
    backend.catalogService.addProduct(product,
        product => onSuccess(product),
        onError,
        atFinally);


export const changeSearchFilter = (searchFilter) => ({
    type: actionTypes.CHANGE_SEARCH_FILTERS,
    searchFilter
});

export const resetSearchFilter = () => ({
    type: actionTypes.RESET_SEARCH_FILTERS
});


const findProductsCompleted = productsSearch => ({
    type: actionTypes.FIND_PRODUCTS_COMPLETED,
    productsSearch
});

export const findProducts = (criteria, atFinally) => dispatch => {

    dispatch(clearProductsSearch());

    backend.catalogService.findProducts(criteria,
        result => dispatch(findProductsCompleted({criteria, result})),
        atFinally);

};

export const previousFindProductsPage = (criteria, atFinally) =>
    findProducts({...criteria, page: criteria.page-1}, atFinally);

export const nextFindProductsPage = (criteria, atFinally) =>
    findProducts({...criteria, page: criteria.page+1}, atFinally);

export const clearProductsSearch = () => ({type: actionTypes.CLEAR_PRODUCTS_SEARCH});

const getProductSuccess = product => ({
    type: actionTypes.GET_PRODUCT_COMPLETED,
    product
});

export const getProduct = (id, atFinally) => dispatch =>
    backend.catalogService.findProductById(id,
        product => dispatch(getProductSuccess(product)),
        atFinally);

export const clearProduct = () => ({type: actionTypes.CLEAR_PRODUCT});

export const updateProduct = (id, data, onSuccess, onError, atFinally) => dispatch =>
    backend.catalogService.updateProduct(id, data,
        product => {
            onSuccess(product.name);
            dispatch(getProductSuccess(product));
        },
        onError,
        atFinally);

const setProductActiveCompleted = () => ({
    type: actionTypes.SET_PRODUCT_ACTIVE_COMPLETED
});

const setProductInactiveCompleted = () => ({
    type: actionTypes.SET_PRODUCT_INACTIVE_COMPLETED
});

export const setProductActive = (id, active, onError, atFinally) => dispatch =>
    backend.catalogService.setProductActive(id, active,
        () => active ? dispatch(setProductActiveCompleted()) : dispatch(setProductInactiveCompleted()),
        onError,
        atFinally);
