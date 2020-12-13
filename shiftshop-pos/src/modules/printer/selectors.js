const getModuleState = state => state.printer;

export const getPrinterStatus = state =>
    getModuleState(state).printerStatus;
