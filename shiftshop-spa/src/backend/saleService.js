import {appFetch, config} from './appFetch';

export const findSales = ({initDate, endDate, orderBy, direction, page}, onSuccess, onError, atFinally) => {

    let path = `/sales?page=${page}&initDate=${initDate.toISOString().split("T")[0]}`;

    if (endDate) {
        path += `&endDate=${endDate.toISOString().split("T")[0]}`;
    }

    if (orderBy) {
        path += `&orderBy=${orderBy}`;
    }

    if (direction) {
        path += `&direction=${direction}`;
    }

    appFetch(path, config('GET'), onSuccess, onError, atFinally);

}

export const findSaleByBarcode = (barcode, onSuccess, atFinally) =>
    appFetch(`/sales/barcodes/${barcode}`, config('GET'), onSuccess, null, atFinally);


export const findFirstSaleBarcodes = (startingCode, onSuccess, atFinally) =>
    appFetch(`/sales/barcodes?startingCode=${startingCode}`, config('GET'), onSuccess, null, atFinally);
