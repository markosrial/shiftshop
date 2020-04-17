import React from 'react';
import {Paper} from '@material-ui/core';

import useStyles from '../styles/SideBar';

import Navigation from './Navigation';

const SideBar = () => {
    const classes = useStyles();

    return (
        <Paper className={classes.root} elevation={1} square>
            <div className={classes.content}>
                <nav className={classes.navigation}>
                    <Navigation/>
                </nav>
            </div>
        </Paper>
    );
};

export default SideBar;
