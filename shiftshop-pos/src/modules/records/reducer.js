import {combineReducers} from 'redux';

import * as actionTypes from './actionTypes';

const initialState = {
    salesDB: null,
    recordsDateFilter: new Date(),
    salesRecords: []
};

const salesDB = (state = initialState.salesDB, action) => {

    switch (action.type) {

        case actionTypes.INSTANTIATE_SALES_DB:

            return action.db;

        case actionTypes.CLOSE_SALES_DB:

            if (state) {
                state.close();
            }

            return initialState.salesDB;

        default:
            return state;
    }

};

const recordsDateFilter = (state = initialState.recordsDateFilter, action) => {

    switch (action.type) {

        case actionTypes.SET_RECORDS_DATE_FILTER:

            return action.date;

        default:
            return state;

    }

}

const salesRecords = (state = initialState.salesRecords, action) => {

    switch (action.type) {

        case actionTypes.GET_RECORDS_COMPLETED:

            return action.records;

        default:
            return state;
    }


}

const reducer = combineReducers({
    salesDB,
    recordsDateFilter,
    salesRecords
});

export default reducer;
