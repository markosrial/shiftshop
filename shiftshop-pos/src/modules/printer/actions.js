import * as actionTypes from './actionTypes';
import data from './constants/BusinessData.json';

// Config

const PRINTER_IP = 'printerIP';
const PRINTER_DEVICE_ID = 'printerDeviceID';

const baseConfig = {
    IP: '192.168.1.168',
    port: '8008',
    deviceID: 'local_printer',
    options: {'crypto': false, 'buffer': false}
}

let notifierCallback = null;

export const setNotifierCallback = callback => notifierCallback = callback;

export const setPrinterIP = ip => sessionStorage.setItem(PRINTER_IP, ip);
export const getPrinterIP = () => sessionStorage.getItem(PRINTER_IP) || baseConfig.IP;

export const setPrinterDeviceID = deviceID => sessionStorage.setItem(PRINTER_DEVICE_ID, deviceID);
export const getPrinterDeviceID = () => sessionStorage.getItem(PRINTER_DEVICE_ID) || baseConfig.deviceID;

// Store Actions

const setDisconnected = () => ({
    type: actionTypes.SET_DISCONNECTED
});

const setConnecting = () => ({
    type: actionTypes.SET_CONNECTING
});

const setConnected = () => ({
    type: actionTypes.SET_CONNECTED
});

// Printer Actions

let ePosDev = null;
let printer = null;

export const connect = () => dispatch => {

    dispatch(setConnecting());

    if (!ePosDev) {
        ePosDev = new epson.ePOSDevice();
    }

    ePosDev.connect(getPrinterIP(), baseConfig.port,
        responseCode => {

            if (responseCode == 'OK' || responseCode == 'SSL_CONNECT_OK') {
                ePosDev.createDevice(getPrinterDeviceID(), ePosDev.DEVICE_TYPE_PRINTER, baseConfig.options,
                    (deviceObj, errorCode) => dispatch(createDeviceCallback(deviceObj, errorCode)));
            }
            else {
                dispatch(setDisconnected());
                if (notifierCallback) {
                    notifierCallback('project.printer.connection.deviceConnectError', responseCode);
                }
            }

    });

    ePosDev.ondisconnect = () => dispatch(setDisconnected());

}

const createDeviceCallback = (deviceObj, errorCode) => dispatch => {

    if (deviceObj == null) {

        dispatch(setDisconnected());

        if (notifierCallback) {
            notifierCallback('project.printer.connection.printerHandlerError', errorCode);
        }
        return;

    }

    printer = deviceObj;

    printer.onreceive = response => {
        if (response.success) {
            // Success on print -> nothing to show
        }
        else {
            dispatch(setDisconnected());

            if (notifierCallback) {
                notifierCallback('project.printer.connection.connectionLost', null, 'warning');
            }
        }
    };

    dispatch(setConnected());

    if (notifierCallback) {
        notifierCallback('project.printer.connection.success', null, 'info', false);
    }

}

export const printTicket = ticket => dispatch => {

    if (!printer || !ePosDev || !ePosDev.isConnected()) {

        dispatch(setDisconnected());

        notifierCallback('project.printer.connection.retryConnect', null, 'warning');
        return;

    }

    // Header test data

    printer.addTextFont(printer.FONT_B);
    printer.addTextStyle(false, false, true, printer.COLOR_NONE);
    printer.addTextAlign(printer.ALIGN_CENTER);
    printer.addTextSize(2, 2);
    printer.addText(data.businessName + '\n\n');
    printer.addTextStyle(false, false, false, printer.COLOR_NONE);
    printer.addTextSize(1, 1);
    printer.addText(data.location + '\n');
    printer.addText('NIF: ' + data.NIF + ' / TLF: ' + data.tlf + '\n');
    printer.addText('\n');
    printer.addText('CÓDIGO DE VENTA\n');
    printer.addBarcode(ticket.barcode, printer.BARCODE_CODE93, printer.HRI_BELOW, printer.FONT_A, 2, 70);
    printer.addText('\n');
    printer.addTextFont(printer.FONT_A);
    printer.addText('Fecha: ' + new Date(ticket.date).toLocaleString() + '\n');
    printer.addText('\n');

    // Items content data

    printer.addTextAlign(printer.ALIGN_LEFT);
    printer.addText(`${'Descripción'.padEnd(30, ' ')} ${'Cant.'.padEnd(5, ' ')} ${'Importe'.padStart(11, ' ')}\n`);
    printer.addText(`${''.padEnd(30, '-')} ${''.padEnd(5, '-')} ${''.padStart(11, '-')}\n`);

    printer.addTextStyle(false, false, false, printer.COLOR_NONE);
    ticket.items.forEach(item => {
        printer.addText(`${item.name.padEnd(30, ' ').substr(0, 30)} ${`x${item.quantity}`.padStart(5, ' ')} ${(item.salePrice * item.quantity).toFixed(2).padStart(11, ' ')}\n`);
        printer.addTextFont(printer.FONT_B);
        printer.addText(`   Código: ${item.barcode}\n`);
        printer.addTextFont(printer.FONT_A);
    });

    printer.addText('\n');
    printer.addTextStyle(false, false, true, printer.COLOR_NONE);
    printer.addTextAlign(printer.ALIGN_RIGHT);
    if (ticket.discount !== null) {
        printer.addText(`Subtotal......: ${(ticket.total +  ticket.discount).toFixed(2).padStart(20, ' ')}\n`);
        printer.addText(`Descuento.....: ${ticket.discount.toFixed(2).padStart(20, ' ')}\n`);
    }
    printer.addTextFont(printer.FONT_B);
    printer.addTextSize(2, 2);
    let total = ticket.total.toFixed(2).padStart(13, ' ');
    printer.addText(`Total (€)...: ${total}\n`);
    printer.addTextFont(printer.FONT_A);
    printer.addTextAlign(printer.ALIGN_CENTER);
    printer.addTextSize(1, 1);
    printer.addText('\n');
    printer.addText('IVA includo\n');
    printer.addText('\n');

    printer.addTextStyle(false, false, false, printer.COLOR_NONE);
    if (ticket.cash > 0) {
        printer.addTextAlign(printer.ALIGN_RIGHT);
        printer.addText(`Entregado.......: ${ticket.cash.toFixed(2).padStart(9, ' ')}\n`);
        printer.addText(`A devolver......: ${(ticket.cash -  ticket.total).toFixed(2).padStart(9, ' ')}\n`);
        printer.addTextAlign(printer.ALIGN_CENTER);
    }

    // Footer text

    printer.addText('\n');
    printer.addText('** Gracias por su visita **\n');
    printer.addText('Visitenos en: www.frikilandshop.com\n');
    printer.addText('\n');
    printer.addCut(printer.CUT_FEED);

    printer.send();

};

export const reconnect = () => dispatch => {

    // Discard Printer object
    ePosDev.deleteDevice(printer, _ => {
        ePosDev.disconnect();
        dispatch(connect());
    });

}
