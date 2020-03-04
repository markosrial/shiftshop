import React from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
import {Box, Card, CardContent, CardHeader, Chip, Divider, Grid} from '@material-ui/core';

import useStyles from '../styles/Product';

import * as selectors from '../selectors';
import ProductROIChip from './ProductROIChip';
import ProductState from './ProductState';

const RowItem = ({label, content}) => {
    const classes = useStyles();

    return (
        <Grid className={classes.gridRow} container item spacing={1} alignItems="center">
            <Grid item xs={12} sm={4} lg={3}>
                <Box fontWeight={500} fontStyle="italic">
                    <FormattedMessage id={label}/>
                </Box>
            </Grid>
            <Grid className={classes.rowContent} item xs>
                {content}
            </Grid>
        </Grid>
    );
};

const Product = ({product}) => {

    const categories = useSelector(selectors.getCategories);

    return (
        <Card>
            <CardHeader title={<FormattedMessage id="project.catalog.Product.title"/>}/>
            <Divider/>
            <CardContent >
                <Grid container>
                    <RowItem label="project.global.field.name" content={product.name}/>
                    <RowItem label="project.global.field.category"
                             content={<Chip label={selectors.getCategoryName(categories,product.categoryId)}/>}/>
                    {product.providerPrice &&
                        <RowItem label="project.global.field.providerPrice" content={product.providerPrice.toFixed(2) + ' €'}/>}
                    <RowItem label="project.global.field.salePrice" content={
                        <Box display="flex" alignItems="center">
                            {product.salePrice.toFixed(2) + ' €'}
                            &nbsp;
                            {product.providerPrice && <ProductROIChip ROI={(product.salePrice - product.providerPrice)}/>}
                        </Box>
                    }/>

                    <RowItem label="project.global.field.barcode" content={<Box fontFamily="Menlo,Arial">{product.barcode}</Box>}/>
                    <RowItem label="project.global.field.state"
                             content={product.active ? <ProductState active showMessage/> : <ProductState showMessage/>}/>
                </Grid>
            </CardContent>
        </Card>
    );

};

Product.propTypes = {
    product: PropTypes.object.isRequired
};

export default Product;
