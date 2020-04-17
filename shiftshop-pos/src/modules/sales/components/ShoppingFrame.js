import React from 'react';
import {Box} from '@material-ui/core';

import useStyles from '../styles/ShoppingFrame';

import AddToCart from './AddToCart';
import ShoppingCart from './ShoppingCart';

const ShoppingFrame = () => {

    const classes = useStyles();

    return (
        <Box className={classes.content}>
            <Box pb={1}>
                <AddToCart/>
            </Box>
            <Box className={classes.shoppingCart}>
                <ShoppingCart/>
            </Box>
        </Box>
    );

};

export default ShoppingFrame;
