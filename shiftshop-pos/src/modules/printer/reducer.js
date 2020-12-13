import {combineReducers} from 'redux';

import * as actionTypes from './actionTypes';
import PrinterStatus from './constants/PrinterStatus';

const initialState = {
    printerStatus: PrinterStatus.UNABLE
};

const printerStatus = (state = initialState.printerStatus, action) => {

    switch (action.type) {

        case actionTypes.SET_DISCONNECTED:
            return PrinterStatus.DISCONNECTED;

        case actionTypes.SET_CONNECTING:
            return PrinterStatus.CONNECTING;

        case actionTypes.SET_CONNECTED:
            return PrinterStatus.CONNECTED;

        default:
            return state;
    }

};

const reducer = combineReducers({
    printerStatus,
});

export default reducer;
