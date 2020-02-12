import * as actionTypes from './actionTypes';

const loginCompleted = user => ({
   type: actionTypes.LOGIN_COMPLETED,
   user
});

export const  login = (userName, password) => dispatch => {
    dispatch(loginCompleted({userName, password}));
};

export const logout = () => ({
    type: actionTypes.LOGOUT
});
