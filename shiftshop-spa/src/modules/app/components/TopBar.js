import React from 'react';
import PropTypes from 'prop-types';
import {AppBar, Hidden, IconButton, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';

import useStyles from '../styles/TopBar'

import {LogOut} from '../../users';

const TopBar = ({openSidebar}) => {
    const classes = useStyles();

    return (
        <AppBar position="sticky" className={classes.topBar}>
            <Toolbar>
                <Hidden mdUp>
                    <IconButton className={classes.sidebarToggle} color="inherit" onClick={openSidebar}>
                        <Menu/>
                    </IconButton>
                </Hidden>
                <Typography className={classes.brand} variant="h4">ShiftShop</Typography>
                <div className={classes.flexGrow} />
                <LogOut/>
            </Toolbar>
        </AppBar>
    );
};

TopBar.propTypes = {
    openSidebar: PropTypes.func.isRequired
};

export default TopBar;
