import {combineReducers} from 'redux';

// import app from '../modules/app';
import shopping from '../modules/shopping';
import sync from '../modules/sync';
import users from '../modules/users';

const appReducer = combineReducers({
    // app: app.reducer,
    shopping: shopping.reducer,
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

