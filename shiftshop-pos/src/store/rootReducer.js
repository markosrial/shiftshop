import {combineReducers} from 'redux';

// import app from '../modules/app';
import users from '../modules/users'

const appReducer = combineReducers({
    // app: app.reducer,
    users: users.reducer,
});

const rootReducer = (state, action) => {

    if (action.type === users.actionTypes.LOGOUT) {
        state = undefined
    }

    return appReducer(state, action);

};

export default rootReducer;

