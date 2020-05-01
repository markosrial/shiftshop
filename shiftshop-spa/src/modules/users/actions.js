import * as actionTypes from './actionTypes';
import {hasRole} from './selectors';
import backend from '../../backend';

import Role from './constants/Role';

const getRolesCompleted = roles => ({
    type: actionTypes.GET_ROLES_COMPLETED,
    roles
});

export const getRoles = () => dispatch =>
    backend.userService.getRoles(
        roles => dispatch(getRolesCompleted(roles))
    );

const loginCompleted = authenticatedUser => ({
    type: actionTypes.LOGIN_COMPLETED,
    authenticatedUser
});

export const login = (userName, password, onSuccess, onErrors, atFinally, reauthenticationCallback) => dispatch =>
    backend.userService.login(userName, password,
        authenticatedUser => {
            dispatch(loginCompleted(authenticatedUser));
            hasRole(authenticatedUser.user, [Role.MANAGER]) && dispatch(getRoles());
            onSuccess();
        },
        onErrors,
        atFinally,
        reauthenticationCallback
    );


export const tryLoginFromServiceToken = (onSuccess, atFinally, reauthenticationCallback) => dispatch =>
    backend.userService.tryLoginFromServiceToken(
        authenticatedUser => {
            if (authenticatedUser) {
                dispatch(loginCompleted(authenticatedUser));
                hasRole(authenticatedUser.user, [Role.MANAGER]) && dispatch(getRoles());
                onSuccess();
            }
        },
        atFinally,
        reauthenticationCallback
    );

export const logout = () => {

    backend.userService.logout();

    return {type: actionTypes.LOGOUT};

};

export const addUser = (user, onSuccess, onError, atFinally) =>
    backend.userService.addUser(user, onSuccess, onError, atFinally);

const getUsersCompleted = usersSearch => ({
    type: actionTypes.GET_USERS_COMPLETED,
    usersSearch
});

export const getUsers = (criteria, atFinally) => dispatch => {

    dispatch(clearUsersSearch());

    backend.userService.getUsers(criteria,
        result => dispatch(getUsersCompleted({criteria, result})),
        atFinally);
};

export const previousUsersPage = (criteria, atFinally) =>
    getUsers({...criteria, page: criteria.page-1}, atFinally);

export const nextUsersPage = (criteria, atFinally) =>
    getUsers({...criteria, page: criteria.page+1}, atFinally);

export const clearUsersSearch = () => ({type: actionTypes.CLEAR_USERS_SEARCH});

export const updateUser = (id, data, onSuccess, onError, atFinally) =>
    backend.userService.updateUser(id, data,
        user => onSuccess(`${user.name} ${user.surnames}`),
        onError,
        atFinally);

export const blockUser = (id, onSuccess, onError) =>
    backend.userService.blockUser(id, onSuccess, onError);

export const unblockUser = (id, onSuccess, onError) =>
    backend.userService.unblockUser(id, onSuccess, onError);
