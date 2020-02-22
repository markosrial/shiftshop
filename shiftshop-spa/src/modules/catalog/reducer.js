import {combineReducers} from "redux";

import * as actionTypes from './actionTypes';

const initialState = {
    categories: []
};

const categories = (state = initialState.categories, action) => {

    switch (action.type) {

        case actionTypes.FIND_ALL_CATEGORIES_COMPLETED:
            return action.categories;

        default:
            return state;
    }

};

const reducer = combineReducers({
    categories,
});

export default reducer;
