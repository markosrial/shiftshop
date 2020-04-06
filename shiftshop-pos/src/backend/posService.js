import {appFetch, appFetchOffline, config} from './appFetch';

export const getLastUpdateTimestamp = (onSuccess, atFinally) =>
    appFetchOffline('/pos/lastUpdateTimestamp', config('GET'),
        onSuccess, null, atFinally, false);

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
