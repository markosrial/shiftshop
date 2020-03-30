import React, {Fragment, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {CircularProgress, Fab} from '@material-ui/core';
import {SystemUpdate} from '@material-ui/icons';

import {useStyles} from '../styles/Synchronization';

import * as actions from '../actions';
import * as selectors from '../selectors';
import {minDelayFunction} from '../../utils';
import SyncStepperDialog from './SyncStepperDialog';

const Synchronization = () => {

    const classes = useStyles();

    const dispatch = useDispatch();
    const lastUpdateTimestamp = useSelector(selectors.getLastUpdateTimestamp);
    const localUpdateTimestamp = useSelector(selectors.getLocalUpdateTimestamp);

    const [open, setOpen] = useState(false);
    const [checking, setChecking] = useState(false);

    useEffect(() => {

        setChecking(true);

        const delay = minDelayFunction(500);

        dispatch(actions.getLastUpdateTimestamp(() => delay(() => setChecking(false))));

    }, []);

    const updateAvailable = useMemo(() => {

        // No local updateTimestamp -> Has never done a sync
        if (!localUpdateTimestamp) {
            // If we get the service last updateTimestamp means we can sync data
            return lastUpdateTimestamp !== null;
        }

        // With localUpdateTimestam if we dont get the service last updateTimestamp
        // means we cant sync data
        if (!lastUpdateTimestamp) return false;

        // With both dates  we can check if we need to sync our local DB
        return (lastUpdateTimestamp > localUpdateTimestamp);

    }, [localUpdateTimestamp, lastUpdateTimestamp]);

    if (checking) {
        return (
            <Fab className={classes.fab} disabled disableRipple>
                <CircularProgress size={24} color="inherit"/>
            </Fab>
        );
    }

    if (!updateAvailable) {
        return null;
    }

    return (
        <Fragment>
            <Fab className={classes.fab} disabled={open} disableRipple onClick={() => setOpen(true)}>
                <SystemUpdate/>
            </Fab>
            {open && <SyncStepperDialog localUpdateTimestamp={localUpdateTimestamp}
                                        lastUpdateTimestamp={lastUpdateTimestamp}
                                        closeDialog={() => setOpen(false)}/>}
        </Fragment>
    );
};

export default Synchronization;
