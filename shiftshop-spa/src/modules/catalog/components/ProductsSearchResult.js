import React from 'react';
import {useSelector} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import {Box, LinearProgress, Typography} from '@material-ui/core';

import {emptyBox, search} from '../../../assets/images';
import useStyles from '../styles/ProductsSearchResult';

import * as selectors from '../selectors';
import ProductList from './ProductList';

const ProductsSearchResult = ({searching, startSearch, stopSearch}) => {
    const classes = useStyles();

    const productsSearch = useSelector(selectors.getProductsSearch);

    if (searching) {
        return (
            <LinearProgress className={classes.spinner} />
        );
    }

    if (!productsSearch) {
        return (
            <div className={classes.emptyPlaceholder}>
                <Box className={classes.imageBox}>
                    <img className={classes.image} src={search} alt="No searchs yet"/>
                </Box>
                <Typography className={classes.emptyText} variant="body1">
                    <FormattedMessage id="project.catalog.ProductsSearchResult.emptySearch"/>
                </Typography>
            </div>
        );
    }

    if (productsSearch.result.items.length === 0) {
        return (
            <div className={classes.emptyPlaceholder}>
                <Box className={classes.imageBox}>
                    <img className={classes.image} src={emptyBox} alt="No products"/>
                </Box>
                <Typography className={classes.emptyText} variant="body1">
                    <FormattedMessage id="project.catalog.ProductsSearchResult.emptyProducts"/>
                </Typography>
            </div>
        );
    }

    return (
        <div className={classes.products}>
            <ProductList products={productsSearch.result} criteria={productsSearch.criteria}
                         startSearch={startSearch} stopSearch={stopSearch}/>
        </div>
    );
};

ProductsSearchResult.propTypes = {
    searching: PropTypes.bool.isRequired,
    startSearch: PropTypes.func.isRequired,
    stopSearch: PropTypes.func.isRequired
};

export default ProductsSearchResult;
