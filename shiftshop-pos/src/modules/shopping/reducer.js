import {combineReducers} from 'redux';

import * as actionTypes from './actionTypes';

const initialState = {
    catalog: []
};

const catalog = (state = initialState.catalog, action) => {

    switch (action.type) {

        case actionTypes.LOAD_CATALOG_COMPLETED:
            return action.catalog;

        default:
            return state;
    }

};

const reducer = combineReducers({
    catalog
});

export default reducer;
