import {combineReducers} from 'redux';

import catalog from '../modules/catalog';
import sales from '../modules/sales';
import users from '../modules/users';

const appReducer = combineReducers({
    catalog: catalog.reducer,
    sales: sales.reducer,
    users: users.reducer,
});

const rootReducer = (state, action) => {

    if (action.type === users.actionTypes.LOGOUT) {
        state = undefined
    }

    return appReducer(state, action);

};

export default rootReducer;

