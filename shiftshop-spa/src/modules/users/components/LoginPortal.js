import React from 'react';
import {Card, CardContent, CardMedia, Divider, Typography} from '@material-ui/core';
import {LockOpenTwoTone} from '@material-ui/icons';

import {loginCard} from '../../../assets/images';
import useStyles from '../styles/LoginPortal';

import LoginForm from './LoginForm';

const LoginPortal = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <CardContent className={classes.content}>
                    <LockOpenTwoTone className={classes.icon} />
                    <Typography className={classes.brand} align="center" variant="h1">ShiftShop</Typography>
                    <Divider className={classes.divider} />
                    <LoginForm />
                </CardContent>
                <CardMedia className={classes.media} image={loginCard} title="Cover" />
            </Card>
        </div>
    );
};

export default LoginPortal;
