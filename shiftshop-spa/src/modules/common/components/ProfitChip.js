import React from 'react';
import PropTypes from 'prop-types';
import {Box, Chip} from '@material-ui/core';
import {ArrowDropDown, ArrowDropUp, ArrowRight} from '@material-ui/icons';

import useStyles from '../styles/ProfitChip';

const ProfitChip = ({profit, isROI}) => {

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
        <Chip className={chip.classes} size="small" label={
            <Box display="flex" alignItems="center">
                {chip.icon}
                {isROI ? (isFinite(profit) ? Math.abs(profit).toFixed(2) : '∞' ): Math.abs(profit).toFixed(2)}
                {isROI ? ' % ROI' : ' €'}
            </Box>
        }/>
    );

};

ProfitChip.propTypes = {
    profit: PropTypes.number.isRequired,
    isROI: PropTypes.bool
};

export default ProfitChip;
