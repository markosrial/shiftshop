import React from 'react';
import {useSelector} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import {LinearProgress, Typography} from '@material-ui/core';

import useStyles from '../styles/ProductsSearchResult';

import * as selectors from '../selectors';
import ProductList from './ProductList';
import {emptyPlaceholder} from '../../../assets/images';

const ProductsSearchResult = ({searching, startSearch, stopSearch}) => {
    const classes = useStyles();

    const productsSearch = useSelector(selectors.getProductsSearch);

    if (searching) {
        return (
            <LinearProgress className={classes.spinner} />
        );
    }

    if (!productsSearch) {
        return null;
    }

    if (productsSearch.result.items.length === 0) {
        return (
            <div className={classes.emptyPlaceholder}>
                <img className={classes.image} src={emptyPlaceholder} alt="No products"/>
                <Typography className={classes.emptyText} variant="subtitle2">
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
