import {
    appFetch,
    config,
    getServiceToken,
    removeServiceToken,
    setReauthenticationCallback,
    setServiceToken
} from './appFetch';

export const login = (userName, password, onSuccess, onErrors, atFinally, reauthenticationCallback) =>
    appFetch('/users/login', config('POST', {userName, password}),
        authenticatedUser => {
            setServiceToken(authenticatedUser.serviceToken);
            setReauthenticationCallback(reauthenticationCallback);
            onSuccess(authenticatedUser);
        },
        onErrors,
        atFinally
    );

export const tryLoginFromServiceToken = (onSuccess, atFinally, reauthenticationCallback) => {

    const serviceToken = getServiceToken();

    if (!serviceToken) {
        onSuccess();
        atFinally();
        return;
    }

    setReauthenticationCallback(reauthenticationCallback);

    appFetch('/users/loginFromServiceToken', config('POST'),
        authenticatedUser => onSuccess(authenticatedUser),
        () => removeServiceToken(),
        atFinally
    );

};

export const logout = () => removeServiceToken();

export const getRoles = onSuccess =>
    appFetch('/users/roles', config('GET'), onSuccess);

export const addUser = (user, onSuccess, onError, atFinally) =>
    appFetch('/users', config('POST', user), onSuccess, onError, atFinally);

export const getUsers = ({onlyActive, page}, onSuccess, atFinally) => {

    let path = `/users?page=${page}`;

    if (!onlyActive) {
        path += `&onlyActive=false`;
    }

    appFetch(path, config('GET'), onSuccess, null, atFinally);

}

export const updateUser = (id, user, onSuccess, onError, atFinally) =>
    appFetch(`/users/${id}`, config('PUT', user),
        onSuccess, onError, atFinally);

export const blockUser = (id, onSuccess, onError) =>
    appFetch(`/users/${id}/inactive`, config('PUT'), onSuccess, onError);

export const unblockUser = (id, onSuccess, onError) =>
    appFetch(`/users/${id}/active`, config('PUT'), onSuccess, onError);

export const changePassword = (id, oldPassword, newPassword, onSuccess, onErrors, atFinally) =>
    appFetch(`/users/${id}/changePassword`,
        config('POST', {oldPassword, newPassword}),
        onSuccess, onErrors, atFinally);
