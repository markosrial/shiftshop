import {appFetch, config} from './appFetch';

export const registerSale = (sale, onSuccess, onError) =>
    appFetch(`/sales`, config('PUT', sale),
        onSuccess, onError, null,true, false);
