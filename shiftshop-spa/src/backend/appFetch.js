const BACKEND_URL = 'http://localhost:8080';
const SERVICE_TOKEN_NAME = 'serviceToken';

let networkErrorCallback;
let reauthenticationCallback;

export const init = callback => networkErrorCallback = callback;

export const setReauthenticationCallback = callback => reauthenticationCallback = callback;

export const setServiceToken = serviceToken =>
    sessionStorage.setItem(SERVICE_TOKEN_NAME, serviceToken);

export const getServiceToken = () => sessionStorage.getItem(SERVICE_TOKEN_NAME);

export const removeServiceToken = () => sessionStorage.removeItem(SERVICE_TOKEN_NAME);

export const config = (method, body) => {

    const config = {};

    config.method = method;

    if (body) {
        if (body instanceof FormData) {
            config.body = body;
        } else  {
            config.headers = {'Content-Type': 'application/json'};
            config.body = JSON.stringify(body);
        }
    }

    let serviceToken = getServiceToken();

    if (serviceToken) {
        if (config.headers) {
            config.headers['Authorization'] = `Bearer ${serviceToken}`;
        } else {
            config.headers = {'Authorization': `Bearer ${serviceToken}`};
        }
    }

    return config;

};

const isJson = response => {

    const contentType = response.headers.get("content-type");

    return contentType && contentType.indexOf("application/json") !== -1;

};

const handleOkResponse = async (response, onSuccess) => {

    if (!response.ok) {
        return false;
    }

    if (!onSuccess) {
        return true;
    }

    if (response.status === 204) {
        onSuccess();
        return true;
    }

    if (isJson(response)) {
        await response.json().then(payload => onSuccess(payload));
    }

    return true;

};

const handle4xxResponse = async (response, onErrors) => {

    if (response.status < 400 || response.status >= 500) {
        return false;
    }

    if (response.status === 401 && reauthenticationCallback) {
        reauthenticationCallback();
        return true;
    }

    if (!isJson(response)) {
        throw new Error();
    }

    if (onErrors) {
        await response.json().then(payload => {
            if (payload.globalError || payload.fieldErrors) {
                onErrors(payload);
            }
        });
    }

    return true;

};

const handleResponse = async (response, onSuccess, onErrors) => {

    // We wait for response.json() before run the return
    // in order to allow run atFinally with the correct sequence
    if (await handleOkResponse(response, onSuccess)) {
        return;
    }

    if (await handle4xxResponse(response, onErrors)) {
        return;
    }

    throw new Error();

};

export const appFetch = (path, options, onSuccess, onErrors, atFinally) =>
    fetch(`${BACKEND_URL}${path}`, options)
        .then(response => handleResponse(response, onSuccess, onErrors))
        .catch(networkErrorCallback)
        .finally(atFinally);
