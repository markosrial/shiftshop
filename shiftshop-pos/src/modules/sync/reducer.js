import {combineReducers} from 'redux';

import * as actionTypes from './actionTypes';

const initialState = {
    initialSync: false,
    localUpdateTimestamp: null,
    lastUpdateTimestamp: null
};

const initialSync = (state = initialState.initialSync, action) => {

    switch (action.type) {

        case actionTypes.FINISH_INITIAL_SYNC:
            return true;

        default:
            return state;
    }

};

const localUpdateTimestamp = (state = initialState.localUpdateTimestamp, action) => {

    switch (action.type) {

        case actionTypes.SET_LOCAL_UPDATE_TIMESTAMP:
            return action.localUpdateTimestamp;

        default:
            return state;

    }

};

const lastUpdateTimestamp = (state = initialState.lastUpdateTimestamp, action) => {

    switch (action.type) {

        case actionTypes.GET_LAST_UPDATE_TIMESTAMP_COMPLETED:
            return action.lastUpdateTimestamp;

        default:
            return state;

    }

};

const reducer = combineReducers({
    initialSync,
    localUpdateTimestamp,
    lastUpdateTimestamp
});

export default reducer;
