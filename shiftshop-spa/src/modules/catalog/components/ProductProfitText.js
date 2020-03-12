import React from 'react';
import PropTypes from 'prop-types';
import {Box} from '@material-ui/core';
import {ArrowDropDown, ArrowDropUp, ArrowRight} from '@material-ui/icons';

import useStyles from '../styles/ProductProfitText';

const ProductProfitText = ({profit, isROI}) => {

    const classes = useStyles();

    let text;

    if (profit > 0) {
        text = {
            icon: <ArrowDropUp/>,
            classes: classes.positive
        };
    } else if (profit === 0) {
        text = {
            icon: <ArrowRight/>,
            classes: classes.neutral
        };
    } else {
        text = {
            icon: <ArrowDropDown/>,
            classes: classes.negative
        };
    }

    return (
        <Box className={text.classes} display="flex" alignItems="center">
            {text.icon}{Math.abs(profit).toFixed(2)}{isROI ? ' % ROI' : ' €'}
        </Box>
    );

};

ProductProfitText.propTypes = {
    profit: PropTypes.number.isRequired,
    isROI: PropTypes.bool
};

export default ProductProfitText;
