const getModuleState = state => state.shopping;

export const getCatalog = state =>
    getModuleState(state).catalog;
