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

export const tryLoginFromServiceToken = (onSuccess, reauthenticationCallback) => {

    const serviceToken = getServiceToken();

    if (!serviceToken) {
        onSuccess();
        return;
    }

    setReauthenticationCallback(reauthenticationCallback);

    appFetch('/users/loginFromServiceToken', config('POST'),
        authenticatedUser => onSuccess(authenticatedUser),
        () => removeServiceToken()
    );

};

export const logout = () => removeServiceToken();
