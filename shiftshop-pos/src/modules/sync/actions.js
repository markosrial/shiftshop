import * as actionTypes from './actionTypes';
import backend from '../../backend';

const LOCAL_UPDATE_TIMESTAMP = 'localUpdateTimestamp';

const getLocalStorageUpdateTimestamp = () =>
    localStorage.getItem(LOCAL_UPDATE_TIMESTAMP);

export const setLocalStorageUpdateTimestamp = timestamp =>
    localStorage.setItem(LOCAL_UPDATE_TIMESTAMP, timestamp);

export const finishInitialSync = () => ({
    type: actionTypes.FINISH_INITIAL_SYNC
});

const setLocalUpdateTimestamp = localUpdateTimestamp => ({
    type: actionTypes.SET_LOCAL_UPDATE_TIMESTAMP,
    localUpdateTimestamp
});

export const initLocalUpdateTimestamp = onSuccess => {

    let updateTimestamp = getLocalStorageUpdateTimestamp();

    if (!updateTimestamp) {
        updateTimestamp = '';
        setLocalStorageUpdateTimestamp(updateTimestamp);
    }

    if (updateTimestamp === '') {
        updateTimestamp = null;
    }

    if (onSuccess) {
        onSuccess(updateTimestamp);
    }

};

export const loadLocalUpdateTimestamp = onSuccess => dispatch => {

    let updateTimestamp = getLocalStorageUpdateTimestamp();

    if (updateTimestamp === '') {
        updateTimestamp = null;
    }

    dispatch(setLocalUpdateTimestamp(updateTimestamp));

    if (onSuccess) {
        onSuccess();
    }

};

const getLastUpdateTimestampCompleted = lastUpdateTimestamp => ({
    type: actionTypes.GET_LAST_UPDATE_TIMESTAMP_COMPLETED,
    lastUpdateTimestamp
});

export const getLastUpdateTimestamp = atFinally => dispatch =>
    backend.posService.getLastUpdateTimestamp(
        lastUpdateTimestamp => dispatch(getLastUpdateTimestampCompleted(lastUpdateTimestamp)),
        atFinally
    );

export const syncUsers = (lastUpdate, onSuccess, onErrors) =>
    backend.posService.syncUsers(lastUpdate, users => onSuccess(users), onErrors);


export const syncProducts = (lastUpdate, onSuccess, onErrors) =>
    backend.posService.syncProducts(lastUpdate, products => onSuccess(products), onErrors);
