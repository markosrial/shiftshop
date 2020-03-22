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

export const getUsers = (page, onSuccess, atFinally) =>
    appFetch(`/users?page=${page}`, config('GET'), onSuccess, null, atFinally);


export const getBlockedUsers = (page, onSuccess, atFinally) =>
    appFetch(`/users/blocked?page=${page}`, config('GET'), onSuccess, null, atFinally);
