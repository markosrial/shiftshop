import * as actionTypes from './actionTypes';

export const login = (username, password) => ({
    type: actionTypes.LOGIN_COMPLETED,
    authenticatedUser: ({user: {username, password}})
});

export const logout = () => {
    return {type: actionTypes.LOGOUT};
};
