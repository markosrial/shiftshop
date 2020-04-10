import {combineReducers} from 'redux';

import * as actionTypes from './actionTypes';
import {LocalSalesDB} from '../../databases';

const initialState = {
    salesDB: null,
};

const salesDB = (state = initialState.salesDB, action) => {

    switch (action.type) {

        case actionTypes.INSTANTIATE_SALES_DB:

            if (state) {
                return state;
            }

            return LocalSalesDB.instantiate();

        case actionTypes.CLOSE_SALES_DB:

            if (state) {
                state.close();
            }

            return initialState.salesDB;

        default:
            return state;
    }

};

const reducer = combineReducers({
    salesDB
});

export default reducer;
