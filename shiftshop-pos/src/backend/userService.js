import {
    appFetch,
    config,
    getServiceToken,
    removeServiceToken,
    setServiceToken
} from './appFetch';

export const login = (userName, password, onSuccess, onErrors, atFinally) =>
    appFetch('/users/login', config('POST', {userName, password}),
        authenticatedUser => {
            setServiceToken(authenticatedUser.serviceToken);
            onSuccess();
        },
        onErrors,
        atFinally
    );

export const tryLoginFromServiceToken = (onSuccess, atFinally) => {

    const serviceToken = getServiceToken();

    if (!serviceToken) {
        atFinally();
        return;
    }

    appFetch('/users/loginFromServiceToken', config('POST'),
        onSuccess,
        removeServiceToken,
        atFinally
    );

};

export const logout = () => removeServiceToken();
