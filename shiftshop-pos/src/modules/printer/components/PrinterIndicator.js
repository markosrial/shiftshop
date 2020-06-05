import React from 'react';
import {useSelector} from 'react-redux';
import {Badge} from '@material-ui/core';
import {Print, PrintDisabled} from '@material-ui/icons';

import useStyles from '../styles/PrinterIndicator';

import PrinterStatus from '../constants/PrinterStatus';
import * as selectors from '../selectors';

const PrinterIndicator = () => {

    const classes = useStyles();

    const printerStatus = useSelector(selectors.getPrinterStatus);

    const getBadgeColor = status => {

        switch (status) {
            case PrinterStatus.CONNECTED:
                return classes.connected;
            case PrinterStatus.CONNECTING:
                return classes.connecting;
            case PrinterStatus.DISCONNECTED:
            default:
                return classes.disconnected;
        }

    }

    if (printerStatus === PrinterStatus.UNABLE) {
        return <PrintDisabled color="inherit"/>;
    }

    return (
        <Badge badgeContent=" " variant="dot" classes={{badge: getBadgeColor(printerStatus)}}
               anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}>
            <Print color="inherit"/>
        </Badge>
    );

}

export default PrinterIndicator;
