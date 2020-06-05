import {combineReducers} from 'redux';

import printer from '../modules/printer';
import records from '../modules/records';
import sales from '../modules/sales';
import sync from '../modules/sync';
import users from '../modules/users';

const appReducer = combineReducers({
    printer: printer.reducer,
    records: records.reducer,
    sales: sales.reducer,
    sync: sync.reducer,
    users: users.reducer,
});

const rootReducer = (state, action) => {

    if (action.type === users.actionTypes.LOGOUT) {
        // Reset store with initial sync completed
        return appReducer(undefined, sync.actions.finishInitialSync());
    }

    return appReducer(state, action);

};

export default rootReducer;

