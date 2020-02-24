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
