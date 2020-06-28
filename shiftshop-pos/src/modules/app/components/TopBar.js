import React from 'react';
import {Link} from 'react-router-dom';
import {AppBar, Box, Chip, Toolbar, Typography} from '@material-ui/core';
import {ShoppingBasketRounded} from '@material-ui/icons';

import useStyles from '../styles/TopBar';

import {PrinterIndicator} from '../../printer';
import {CartBadgeCount} from '../../sales';
import {LogOut} from '../../users';

const TopBar = () => {
    const classes = useStyles();

    return (
        <AppBar position="static" className={classes.topBar}>
            <Toolbar>
                <Typography className={classes.brand} variant="h3">
                    <Link to="/">ShiftShop</Link>
                    &nbsp;
                    <Chip size="small" label="POS"/>
                </Typography>
                <div className={classes.flexGrow} />
                <PrinterIndicator/>
                <Box ml={2}/>
                <CartBadgeCount Icon={<ShoppingBasketRounded/>}/>
                <Box className={classes.logoutButton}>
                    <LogOut/>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default TopBar;
