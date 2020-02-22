import * as actionTypes from './actionTypes';
import backend from '../../backend';

export const addCategory = (category, onSuccess, onError, atFinally) => dispatch =>
    backend.catalogService.addCategory(category,
        category => {
            onSuccess(category.name);
        },
        onError,
        atFinally);

const findAllCategoriesCompleted = categories => ({
    type: actionTypes.FIND_ALL_CATEGORIES_COMPLETED,
    categories
});

export const findAllCategories = () => dispatch =>
    backend.catalogService.findAllCategories(
        categories => dispatch(findAllCategoriesCompleted(categories))
    );