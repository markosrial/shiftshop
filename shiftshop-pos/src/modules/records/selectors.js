const getModuleState = state => state.records;

export const getSalesDB = state =>
    getModuleState(state).salesDB;

export const getRecordsDateFilter = state =>
    getModuleState(state).recordsDateFilter ;

export const getSalesRecords = state =>
    getModuleState(state).salesRecords;
