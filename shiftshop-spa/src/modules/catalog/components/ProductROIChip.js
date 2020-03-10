import React from 'react';
import PropTypes from 'prop-types';
import {Box, Chip} from '@material-ui/core';
import {ArrowDropDown, ArrowDropUp, ArrowRight} from '@material-ui/icons';

import useStyles from '../styles/ProductROIChip';

const ProductROIChip = ({ROI}) => {

    const classes = useStyles();

    let chip;

    if (ROI > 0) {
        chip = {
            icon: <ArrowDropUp/>,
            classes: classes.positive
        };
    } else if (ROI === 0) {
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
                {chip.icon}{Math.abs(ROI).toFixed(2)} € ROI
            </Box>
        }/>
    );

};

ProductROIChip.propTypes = {
    ROI: PropTypes.number.isRequired
};

export default ProductROIChip;
