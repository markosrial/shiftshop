import React from 'react';
import {useSelector} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {Box, LinearProgress, Typography} from '@material-ui/core';

import {emptyStreet, find} from '../../../assets/images';
import useStyles from '../styles/SalesSearchResult';

import * as selectors from '../selectors';
import SaleList from './SaleList';

const SalesSearchResult = ({searching, startSearch, stopSearch}) => {

    const classes = useStyles();

    const salesSearch = useSelector(selectors.getSalesSearch);

    if (searching) {
        return (
            <LinearProgress className={classes.spinner} />
        );
    }

    if (!salesSearch) {
        return (
            <div className={classes.emptyPlaceholder}>
                <Box className={classes.imageBox}>
                    <img className={classes.image} src={find} alt="No searchs yet"/>
                </Box>
                <Typography className={classes.emptyText} variant="body1">
                    <FormattedMessage id="project.sales.SalesSearchResult.emptySearch"/>
                </Typography>
            </div>
        );
    }

    if (salesSearch.result.items.length === 0) {
        return (
            <div className={classes.emptyPlaceholder}>
                <Box className={classes.imageBox}>
                    <img className={classes.image} src={emptyStreet} alt="No sales"/>
                </Box>
                <Typography className={classes.emptyText} variant="body1">
                    <FormattedMessage id="project.sales.SalesSearchResult.emptySales"/>
                </Typography>
            </div>
        );
    }

    return (
        <Box mt={2}>
            <SaleList sales={salesSearch.result} criteria={salesSearch.criteria}
                      startSearch={startSearch} stopSearch={stopSearch}/>
        </Box>
    );

}

export default SalesSearchResult;
