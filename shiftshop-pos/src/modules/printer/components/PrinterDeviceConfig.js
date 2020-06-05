import React, {useEffect, useState} from 'react';
import {FormattedMessage} from 'react-intl';
import {Button, Grid, TextField} from '@material-ui/core';

import * as actions from '../actions';
import {formValidator} from '../../../utils';

const PrinterDeviceConfig = () => {

    const [actualIP, setActualIP] = useState(null);
    const [newIP, setNewIP] = useState('');
    const [actualDeviceID, setActualDeviceID] = useState(null);
    const [newDeviceID, setNewDeviceID] = useState('');

    useEffect(() => {

        const IP = actions.getPrinterIP();
        const deviceID = actions.getPrinterDeviceID();

        setActualIP(IP);
        setNewIP(IP);

        setActualDeviceID(deviceID);
        setNewDeviceID(deviceID);

    }, []);

    const hasChanges = () => (actualIP !== newIP) || (actualDeviceID !== newDeviceID);

    const checkValid = () => {
        return formValidator.isNotEmpty(newDeviceID)
            && formValidator.isValidIPv4(newIP);
    }

    const saveConfig = () => {

        if (!checkValid()) {
            return;
        }

        const IP = newIP.trim();
        const deviceID = newDeviceID.trim();

        actions.setPrinterIP(IP);
        actions.setPrinterDeviceID(deviceID);

        setNewIP(IP);
        setActualIP(IP);

        setNewDeviceID(deviceID);
        setActualDeviceID(deviceID);

    }

    const resetChanges = () => {
        setNewIP(actualIP);
        setNewDeviceID(actualDeviceID);
    }

    return (
        <Grid container spacing={1}>
            <Grid container item xs={12} justify="center" alignItems="center">
                <Grid item xs={2}>
                    <FormattedMessage id="project.global.field.deviceIP"/>:
                </Grid>
                <Grid container item justify="flex-end" xs={3}>
                    <TextField value={newIP} onChange={e => setNewIP(e.target.value)}
                               error={!formValidator.isValidIPv4(newIP)}/>
                </Grid>
            </Grid>
            <Grid container item xs={12} justify="center" alignItems="center">
                <Grid item xs={2}>
                    <FormattedMessage id="project.global.field.deviceID"/>:
                </Grid>
                <Grid container item justify="flex-end" xs={3}>
                    <TextField value={newDeviceID} onChange={e => setNewDeviceID(e.target.value)}
                               error={formValidator.isEmpty(newDeviceID)}/>
                </Grid>
            </Grid>
            <Grid container item xs={12} justify="center">
                <Grid container item xs={5} justify="flex-end">
                    <Button variant="contained" color="primary"
                            onClick={() => resetChanges()}
                            disableElevation disabled={!hasChanges()}>
                        <FormattedMessage id="project.global.button.clean"/>
                    </Button>
                    &nbsp;
                    <Button variant="contained" color="primary"
                            onClick={() => saveConfig()}
                            disableElevation disabled={!hasChanges()}>
                        <FormattedMessage id="project.global.button.save"/>
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );

}

export default PrinterDeviceConfig;
