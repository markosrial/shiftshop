const getModuleState = state => state.sync;

export const getInitialSync = state =>
    getModuleState(state).initialSync;

export const getLocalUpdateTimestamp = state =>
    getModuleState(state).localUpdateTimestamp;

export const getLastUpdateTimestamp = state =>
    getModuleState(state).lastUpdateTimestamp;

