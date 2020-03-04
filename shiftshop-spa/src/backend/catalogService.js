import {appFetch, config} from './appFetch';

/* Categories */

export const addCategory = (category, onSuccess, onError, atFinally) =>
    appFetch('/catalog/categories', config('POST', category),
        onSuccess, onError, atFinally);

export const findAllCategories = (onSuccess) =>
    appFetch('/catalog/categories', config('GET'), onSuccess);

export const updateCategory = (id, category, onSuccess, onError, atFinally) =>
    appFetch(`/catalog/categories/${id}`, config('PUT', category),
        onSuccess, onError, atFinally);

/* Products */

export const addProduct = (product, onSuccess, onError, atFinally) =>
    appFetch('/catalog/products', config('POST', product), onSuccess, onError, atFinally);

export const findProducts = ({categoryId, keywords, orderBy, order, onlyActive, page}, onSuccess, atFinally) => {

    let path = `/catalog/products?page=${page}`;

    if (categoryId) {
        path += `&categoryId=${categoryId}`;
    }

    if (keywords && keywords.trim() !== '') {
        path += `&keywords=${keywords.trim()}`;
    }

    if (orderBy && orderBy !== '') {
        path += `&orderBy=${orderBy}`;
    }

    if (order && order !== '') {
        path += `&order=${order}`;
    }

    if (onlyActive) {
        path += `&onlyActive=true`;
    }

    appFetch(path, config('GET'), onSuccess, null, atFinally);
};

export const findProductById = (id, onSuccess, atFinally) =>
    appFetch(`/catalog/products/${id}`, config('GET'), onSuccess, null, atFinally);
