
export const getROI = (profit, investment) => {

    if (investment > 0) {
        return ((profit / investment) - 1) * 100;
    }

    if (profit > 0) {
        return Infinity;
    }

    return 0;

};
