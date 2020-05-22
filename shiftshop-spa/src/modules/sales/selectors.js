const getModuleState = state => state.sales;

export const getSearchFilter = state => getModuleState(state).searchFilter;

export const getSalesSearch = state => getModuleState(state).salesSearch;

export const getSale = state => getModuleState(state).sale;

export const getTopBestSelling = state => getModuleState(state).topBestSelling;

export const getTopProfitable = state => getModuleState(state).topProfitable;

export const getMonthSalesResume = state => getModuleState(state).monthSalesResume;

export const getYearSalesResume = state => getModuleState(state).yearSalesResume;
