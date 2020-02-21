import backend from '../../backend';

export const addCategory = (category, onSuccess, onError, atFinally) => dispatch =>
    backend.catalogService.addCategory(category,
        category => {
            onSuccess(category.name);
        },
        onError,
        atFinally);
