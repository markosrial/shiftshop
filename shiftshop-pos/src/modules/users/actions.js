import * as actionTypes from './actionTypes';
import backend from '../../backend';

const loginCompleted = user => ({
   type: actionTypes.LOGIN_COMPLETED,
   user
});

export const  login = user => dispatch => {
    dispatch(loginCompleted(user));
};

export const logout = () => {

    backend.userService.logout();

    return {type: actionTypes.LOGOUT};

};

export const serviceLogin = (userName, password, onSuccess, onErrors, atFinally) =>
    backend.userService.login(userName, password,
        onSuccess,
        onErrors,
        atFinally
    );

