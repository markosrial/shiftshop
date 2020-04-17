import * as actionTypes from './actionTypes';

import {SalesDB} from '../../databases';

const instantiateSalesDBCompleted = db => ({
    type: actionTypes.INSTANTIATE_SALES_DB,
    db
});

export const instantiateSalesDB = onError => dispatch => {

    SalesDB.instantiate()
        .then(db => dispatch(instantiateSalesDBCompleted(db)))
        .catch(onError);

};

export const closeSalesDB = () => ({
    type: actionTypes.CLOSE_SALES_DB
});

export const saveSale = (dbInstance, sale, onSuccess, onError) => {

    if (!dbInstance) {
        onError();
        return;
    }

    dbInstance.add(sale)
        .then(onSuccess)
        .catch(onError);

};

const setRecordsDateFilter = date => ({
    type: actionTypes.SET_RECORDS_DATE_FILTER,
    date
})

const getRecordsCompleted = records => ({
    type: actionTypes.GET_RECORDS_COMPLETED,
    records
});

export const getSalesByDate = (dbInstance, date, onError, atFinally) => dispatch => {

    if (!dbInstance) {
        onError();
        atFinally();
        return;
    }

    dbInstance.getByDate(date)
        .then(sales => {
            dispatch(getRecordsCompleted(sales));
            dispatch(setRecordsDateFilter(date));
        })
        .catch(onError)
        .finally(atFinally);

};
