import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {Box, Button, Card, CardActions, CardContent, CardHeader, Divider} from '@material-ui/core';

import useStyles from '../styles/PrinterConfigFrame';

import * as actions from '../actions';
import * as selectors from '../selectors';
import PrinterStatus from '../constants/PrinterStatus';
import PrinterDeviceConfig from './PrinterDeviceConfig';

const PrinterConfigFrame = () => {

    const classes = useStyles();

    const dispatch = useDispatch();
    const printerStatus = useSelector(selectors.getPrinterStatus);

    return (
        <Box className={classes.content}>
            <Card>
                <CardHeader title={<FormattedMessage id="project.printer.PrinterConfigFrame.deviceTitle"/>}/>
                <CardContent>
                    <PrinterDeviceConfig/>
                </CardContent>
                <Divider/>
                <CardActions>
                    {(printerStatus === PrinterStatus.CONNECTED) &&
                        <Button variant="contained" color="secondary" disableElevation
                                onClick={() => dispatch(actions.reconnect())}>
                            <FormattedMessage id="project.global.button.reconnect"/>
                        </Button>}
                    {(printerStatus === PrinterStatus.DISCONNECTED) &&
                        <Button variant="contained" color="primary" disableElevation
                                onClick={() => dispatch(actions.connect())}>
                            <FormattedMessage id="project.global.button.connect"/>
                        </Button>}
                </CardActions>
            </Card>
        </Box>
    );

};

export default PrinterConfigFrame;
