import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {
    Box,
    Button,
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
import {Close} from '@material-ui/icons'

import {useStyles} from '../styles/SyncStepperDialog';

import * as actions from '../actions';
import ServiceAuth from './ServiceAuth';
import ServiceSync from './ServiceSync';

const SyncStepperDialog = ({localUpdateTimestamp, lastUpdateTimestamp, closeDialog}) => {

    const classes = useStyles();

    const dispatch = useDispatch();
    const [activeStep, setActiveStep] = useState(0);

    const nextStep = () => setActiveStep(activeStep + 1);

    const endSync = () => {
        nextStep();
        dispatch(actions.loadLocalUpdateTimestamp());
    };

    return (
        <Dialog open fullWidth scroll="body" disableBackdropClick disableEscapeKeyDown>
            <DialogTitle>
                <Typography component="span" variant="h4">
                    <FormattedMessage id="project.sync.Synchronization.title"/>
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
                                <FormattedMessage id="project.sync.Synchronization.serviceAuthentication"/>
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
                                <FormattedMessage id="project.sync.Synchronization.downloadUpdates"/>
                            </Typography>
                        </StepLabel>
                        <StepContent>
                            <Box className={classes.stepContent}>
                                <ServiceSync
                                    localUpdateTimestamp={localUpdateTimestamp}
                                    lastUpdateTimestamp={lastUpdateTimestamp}
                                    nextStep={nextStep} onCancel={closeDialog}/>
                            </Box>
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>
                            <Typography variant="subtitle1">
                                <FormattedMessage id="project.sync.Synchronization.synchronizationEnd"/>
                            </Typography>
                        </StepLabel>
                        <StepContent>
                            <Box className={classes.stepContent}>
                                <Button color="primary" variant="contained" size="small" disableElevation
                                        onClick={endSync}>
                                    <FormattedMessage id="project.global.button.finalize"/>
                                </Button>
                            </Box>
                        </StepContent>
                    </Step>
                </Stepper>
            </DialogContent>
        </Dialog>
    );
};

export default SyncStepperDialog;
