import React from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {FormattedDate, FormattedMessage} from 'react-intl';
import {Box, Chip, Grid} from '@material-ui/core';

import useStyles from '../styles/ProductDetails';

import * as selectors from '../selectors';
import {ProfitChip} from '../../common';
import ProductState from './ProductState';

const RowItem = ({label, content}) => {
    const classes = useStyles();

    return (
        <Grid className={classes.gridRow} container item spacing={1} alignItems="center">
            <Grid item xs={12} sm={4} lg={3}>
                <Box fontWeight={500} fontSize="body1.fontSize" fontStyle="italic">
                    <FormattedMessage id={label}/>
                </Box>
            </Grid>
            <Grid className={classes.rowContent} item xs>
                <Box fontSize="body1.fontSize">
                    {content}
                </Box>
            </Grid>
        </Grid>
    );
};

const ProductDetails = ({product}) => {

    const categories = useSelector(selectors.getCategories);

    return (
        <Grid container>
            <RowItem label="project.global.field.name" content={product.name}/>
            <RowItem label="project.global.field.category"
                     content={<Chip label={selectors.getCategoryName(categories, product.categoryId)}/>}/>
            {(product.providerPrice != null) &&
                <RowItem label="project.global.field.providerPrice" content={product.providerPrice.toFixed(2) + ' €'}/>}
            <RowItem label="project.global.field.salePrice" content={
                <Box display="flex" alignItems="center">
                    {product.salePrice.toFixed(2) + ' €'}
                    &nbsp;
                    {(product.providerPrice != null) && <ProfitChip profit={(product.salePrice - product.providerPrice)}/>}
                </Box>
            }/>
            <RowItem label="project.global.field.creationDate" content={<FormattedDate value={product.creationDate}/>}/>
            <RowItem label="project.global.field.barcode" content={<Box fontFamily="Menlo,Arial">{product.barcode}</Box>}/>
            <RowItem label="project.global.field.state"
                     content={product.active ? <ProductState active showMessage/> : <ProductState showMessage/>}/>
        </Grid>
    );

};

ProductDetails.propTypes = {
    product: PropTypes.object.isRequired
};

export default ProductDetails;
