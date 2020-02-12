import React from 'react';
import {Box, Card, CardContent, CardMedia, Chip, Divider, Typography} from '@material-ui/core';
import {LockOpenTwoTone} from '@material-ui/icons';

import {loginCard} from '../../../assets/images';
import {useStyles} from './LoginPortalStyles';

import LoginForm from './LoginForm';

const LoginPortal = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <CardContent className={classes.content}>
                    <LockOpenTwoTone className={classes.icon} />
                    <Box display="flex" justifyContent="center">
                        <Typography className={classes.brand} variant="h1">MyApp</Typography>
                        <Chip className={classes.brandChip} label="CHIP"/>
                    </Box>
                    <Divider className={classes.divider} />
                    <LoginForm/>
                </CardContent>
                <CardMedia className={classes.media} image={loginCard} title="Cover" />
            </Card>
        </div>
    );
};

export default LoginPortal;
