const getModuleState = state => state.sales;

export const getSearchFilter = state => getModuleState(state).searchFilter;

export const getSalesSearch = state => getModuleState(state).salesSearch;
