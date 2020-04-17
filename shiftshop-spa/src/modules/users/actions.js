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

export const getUsers = (page, atFinally) => dispatch => {

    dispatch(clearUsersSearch());

    backend.userService.getUsers(page,
        result => dispatch(getUsersCompleted({page, result})),
        atFinally);
};

export const previousUsersPage = (page, atFinally) =>
    getUsers(page-1, atFinally);

export const nextUsersPage = (page, atFinally) =>
    getUsers(page+1, atFinally);

export const clearUsersSearch = () => ({type: actionTypes.CLEAR_USERS_SEARCH});

const getBlockedUsersCompleted = blockedUsersSearch => ({
    type: actionTypes.GET_BLOCKED_USERS_COMPLETED,
    blockedUsersSearch
});

export const getBlockedUsers = (page, atFinally) => dispatch => {

    dispatch(clearBlockedUsersSearch());

    backend.userService.getBlockedUsers(page,
        result => dispatch(getBlockedUsersCompleted({page, result})),
        atFinally);};

export const previousBlockedUsersPage = (page, atFinally) =>
    getUsers(page-1, atFinally);

export const nextBlockedUsersPage = (page, atFinally) =>
    getUsers(page+1, atFinally);

export const clearBlockedUsersSearch = () => ({type: actionTypes.CLEAR_BLOCKED_USERS_SEARCH});
