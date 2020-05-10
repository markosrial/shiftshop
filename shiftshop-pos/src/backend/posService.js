import {appFetch, config} from './appFetch';

export const getLastUpdateTimestamp = (onSuccess, atFinally) =>
    appFetch('/pos/lastUpdateTimestamp', config('GET'),
        onSuccess, null, atFinally, true, false);

export const syncUsers = (lastUpdate, onSuccess, onErrors) => {

    let path = '/pos/syncUsers';

    if (lastUpdate) {
        path += '?lastUpdate=' + lastUpdate;
    }

    return appFetch(path, config('GET'), onSuccess, onErrors, null);

};

export const syncProducts = (lastUpdate, onSuccess, onErrors) => {

    let path = '/pos/syncProducts';

    if (lastUpdate) {
        path += '?lastUpdate=' + lastUpdate;
    }

    return appFetch(path, config('GET'), onSuccess, onErrors, null);

};
