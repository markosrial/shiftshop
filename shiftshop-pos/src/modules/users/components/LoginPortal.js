import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Box, Card, CardContent, CardMedia, Chip, Divider, Typography} from '@material-ui/core';
import {LockOpenTwoTone} from '@material-ui/icons';

import {loginCard} from '../../../assets/images';
import {useStyles} from '../styles/LoginPortal';

import LoginForm from './LoginForm';
import sync, {InfoLocalUpdate, InitialClean, Synchronization} from '../../sync';

const LoginPortal = () => {

    const classes = useStyles();

    const dispatch = useDispatch();
    const initialSync = useSelector(sync.selectors.getInitialSync);
    const [initLoad, setInitLoad] = useState(false);

    useEffect(() => {
        dispatch(sync.actions.loadLocalUpdateTimestamp(() => setInitLoad(true)));
    }, []);

    if (!initialSync) {
        return (
            <div className={classes.root}>
                <InitialClean callOnSuccess={() => dispatch(sync.actions.finishInitialSync())}/>
            </div>
        );
    }

    return (
        <div className={classes.root}>
            <div className={classes.localUpdate}>
                {initLoad && <InfoLocalUpdate/>}
            </div>
            <Card className={classes.card}>
                <CardContent className={classes.content}>
                    <LockOpenTwoTone className={classes.icon} />
                    <Box display="flex" justifyContent="center">
                        <Typography className={classes.brand} variant="h1">ShiftShop</Typography>
                        <Chip className={classes.brandChip} label="POS"/>
                    </Box>
                    <Divider className={classes.divider} />
                    <LoginForm/>
                </CardContent>
                <CardMedia className={classes.media} image={loginCard} title="Cover" />
            </Card>
            <Synchronization/>
        </div>
    );
};

export default LoginPortal;
