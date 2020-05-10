import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useSnackbar} from 'notistack';
import {FormattedMessage} from 'react-intl';
import {
    Badge,
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    Step,
    StepContent,
    StepLabel,
    Stepper,
    Typography
} from '@material-ui/core';
import {Close, CloudUpload} from '@material-ui/icons';

import {useStyles} from '../styles/UploadSalesDialog';

import * as selectors from '../selectors';
import {ServiceAuth} from '../../sync';
import UploadSalesProcess from './UploadSalesProcess';
import UploadSalesErrors from './UploadSalesErrors';

const UploadSalesDialog = () => {

    const classes = useStyles();

    const {enqueueSnackbar, closeSnackbar} = useSnackbar();

    const salesDB = useSelector(selectors.getSalesDB);

    const [pendingSales, setPendingSales] = useState(null);
    const [counter, setCounter] = useState(0);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        getPendingSales();
    }, []);

    const nextStep = () => setActiveStep(activeStep + 1)
    const stopLoading = () => setLoading(false);
    const closeDialog = () => {
        setOpen(false);
        setCounter(0);
        setActiveStep(0);
        setErrors([]);
    }

    const getPendingSales = () => {

        setLoading(true);

        if (!salesDB) {
            stopLoading();
            return;
        }

        salesDB.getPendingSales()
            .then(sales => setPendingSales(sales))
            .catch(error =>
                enqueueSnackbar(<FormattedMessage id={`project.bd.error.${error}`}/>, {
                    variant: 'error', persist: true,
                    action: key => (<Button color="inherit" variant="outlined" onClick={() => closeSnackbar(key)}>
                        <FormattedMessage id="project.global.button.close"/>
                    </Button>)
                }))
            .finally(stopLoading);
    }

    const onFinish = (count, errors) => {
        setCounter(count);
        setErrors(errors);
        nextStep();
    };

    const endUpload = () => {
        nextStep();
        getPendingSales();
        closeDialog();
    };

    return (
        <Box>
            <Button size="small" color="primary" variant="contained" disableElevation
                    onClick={() => setOpen(true)} disabled={!pendingSales || pendingSales.length === 0}>
                {loading
                    ? <CircularProgress className={classes.buttonProgress} size={24}/>
                    : <CloudUpload fontSize="small"/>}
                &nbsp;
                <FormattedMessage id="project.global.button.upload"/>
            </Button>
            {pendingSales && <Badge color="secondary" badgeContent={pendingSales.length} max={99}>&nbsp;</Badge>}
            {open && <Dialog open fullWidth scroll="body" disableBackdropClick disableEscapeKeyDown>
                <DialogTitle>
                    <Typography component="span" variant="h4">
                        <FormattedMessage id="project.records.UploadSalesDialog.title"/>
                    </Typography>
                    {activeStep === 0 &&
                    <IconButton className={classes.closeButton} onClick={closeDialog}>
                        <Close/>
                    </IconButton>}
                </DialogTitle>
                <Divider/>
                <DialogContent>
                    <Stepper activeStep={activeStep} orientation="vertical">
                        <Step>
                            <StepLabel>
                                <Typography variant="subtitle1">
                                    <FormattedMessage id="project.records.UploadSalesDialog.serviceAuthentication"/>
                                </Typography>
                            </StepLabel>
                            <StepContent>
                                <Box className={classes.stepContent}>
                                    <ServiceAuth nextStep={nextStep}/>
                                </Box>
                            </StepContent>
                        </Step>
                        <Step>
                            <StepLabel>
                                <Typography variant="subtitle1">
                                    <FormattedMessage id="project.records.UploadSalesDialog.uploadingSales"/>
                                </Typography>
                            </StepLabel>
                            <StepContent>
                                <Box className={classes.stepContent}>
                                    <UploadSalesProcess pendingSales={pendingSales} onFinish={onFinish}/>
                                </Box>
                            </StepContent>
                        </Step>
                        <Step>
                            <StepLabel>
                                <Typography variant="subtitle1">
                                    <FormattedMessage id="project.records.UploadSalesDialog.uploadEnd"/>
                                </Typography>
                            </StepLabel>
                            <StepContent>
                                <Box className={classes.stepContent}>
                                    <Box mb={1}>
                                        <FormattedMessage id="project.records.UploadSalesDialog.uploadSummary"/>
                                        : {counter}/{pendingSales.length}
                                    </Box>
                                    <Box display="flex">
                                        {errors.length > 0 && <Box mr={1}><UploadSalesErrors errors={errors}/></Box>}
                                        <Button color="primary" variant="contained" size="small" disableElevation
                                                onClick={endUpload}>
                                            <FormattedMessage id="project.global.button.finalize"/>
                                        </Button>
                                    </Box>
                                </Box>
                            </StepContent>
                        </Step>
                    </Stepper>
                </DialogContent>
            </Dialog>}
        </Box>
    );

}

export default UploadSalesDialog;
