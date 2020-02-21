import {appFetch, config} from './appFetch';

export const addCategory = (category, onSuccess, onError, atFinally) =>
    appFetch('/catalog/categories', config('POST', category),
        onSuccess, onError, atFinally);
