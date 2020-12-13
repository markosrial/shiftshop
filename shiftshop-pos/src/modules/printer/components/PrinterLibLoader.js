import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useSnackbar} from 'notistack';
import {FormattedMessage} from 'react-intl';
import Script from 'react-load-script';
import {Button} from '@material-ui/core';

import * as actions from '../actions';
import PrinterNotification from './PrinterNotification';

const PrinterLibLoader = () => {

    const {enqueueSnackbar, closeSnackbar} = useSnackbar();

    const dispatch = useDispatch();

    useEffect(() => {
        actions.setNotifierCallback(showPrinterMessage);
    }, []);

    const showPrinterMessage = (message, errorCode = null, variant = 'error', persist = true) => {

        let options = {variant, persist};

        if (persist) {

            Object.assign(options,
                {action: key => (
                    <Button variant="outlined" color="inherit" onClick={() => closeSnackbar(key)}>
                        <FormattedMessage id="project.global.button.close"/>
                    </Button>)});

        }

        return enqueueSnackbar(<PrinterNotification id={message} errorCode={errorCode}/>,
            {...options});

    }

    const onLoadSuccess = () => {
        dispatch(actions.connect());
    }

    const onLoadError = () => {
        showPrinterMessage('project.printer.connection.loadLibError');
    }

    return (
        <Script url='../lib/epos-2.14.0.js' onLoad={onLoadSuccess} onError={onLoadError}/>
    );

}

export default PrinterLibLoader;
