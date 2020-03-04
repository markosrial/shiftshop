import React from 'react';
import {useHistory} from 'react-router-dom';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
import {Button, Typography} from '@material-ui/core';

import {notFound} from '../../../assets/images';
import useStyles from '../styles/ProductResult';

import Product from './Product';

const ProductResult = ({product}) => {
    const classes = useStyles();

    const history = useHistory();

    if (!product) {
        return (
            <div className={classes.emptyPlaceholder}>
                <img className={classes.image} src={notFound} alt="No product"/>
                <Typography className={classes.emptyText} variant="subtitle1">
                    <FormattedMessage id="project.catalog.ProductResult.notFound"/>
                </Typography>
                <Button className={classes.backToProducts} variant="outlined"
                        onClick={() => history.push('/catalog/products')}>
                    <FormattedMessage id="project.catalog.ProductResult.backToProducts"/>
                </Button>
            </div>
        );
    }

    return (
        <Product product={product}/>
    );

};

ProductResult.propTypes = {
    product: PropTypes.object
};

export default ProductResult;
