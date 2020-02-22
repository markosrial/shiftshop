const getModuleState = state => state.catalog;

export const getCategories = state => getModuleState(state).categories;

export const getCategoryName = (categories, id) => {

    if (!categories) {
        return '';
    }

    const category = categories.find(category => category.id === id);

    if (!category) {
        return '';
    }

    return category.name;
};

export const getSearchFilter = state => getModuleState(state).searchFilter;

export const getProductsSearch = state => getModuleState(state).productsSearch;

/*export const isSearching = state =>
    getModuleState(state).productsSearching > 0;

export const getLastCriteria = state =>
    getModuleState(state).lastCriteria;

export const getProduct = state =>
    getModuleState(state).product;

export const getVersionDownloading = state =>
    getModuleState(state).versionDownloading;*/
