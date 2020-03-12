import React from 'react';
import PropTypes from 'prop-types';
import {Box, Chip} from '@material-ui/core';
import {ArrowDropDown, ArrowDropUp, ArrowRight} from '@material-ui/icons';

import useStyles from '../styles/ProductProfitChip';

const ProductProfitChip = ({profit, isROI}) => {

    const classes = useStyles();

    let chip;

    if (profit > 0) {
        chip = {
            icon: <ArrowDropUp/>,
            classes: classes.positive
        };
    } else if (profit === 0) {
        chip = {
            icon: <ArrowRight/>,
            classes: classes.neutral
        };
    } else {
        chip = {
            icon: <ArrowDropDown/>,
            classes: classes.negative
        };
    }

    return (
        <Chip className={chip.classes} label={
            <Box display="flex" alignItems="center">
                {chip.icon}{Math.abs(profit).toFixed(2)}{isROI ? ' % ROI' : ' €'}
            </Box>
        }/>
    );

};

ProductProfitChip.propTypes = {
    profit: PropTypes.number.isRequired,
    isROI: PropTypes.bool
};

export default ProductProfitChip;
