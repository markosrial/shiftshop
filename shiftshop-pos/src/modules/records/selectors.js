const getModuleState = state => state.records;

export const getSalesDB = state =>
    getModuleState(state).salesDB;
