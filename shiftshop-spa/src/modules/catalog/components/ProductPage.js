import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom'
import {Box, CircularProgress, Grid, Typography} from '@material-ui/core';
import {FormattedMessage} from 'react-intl';

import useStyles from '../styles/ProductPage';

import * as actions from '../actions';
import * as selectors from '../selectors';
import ProductResult from './ProductResult';

const ProductPage = () => {

    // Styles
    const classes = useStyles();

    // State & store
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const product = useSelector(selectors.getProduct);

    // Path
    const {id} = useParams();

    // Effects
    useEffect(() => {

        const productId = Number.parseInt(id);

        if (isNaN(productId)) {
            setLoading(false);
            return;
        }

        dispatch(actions.getProduct(productId, () => setLoading(false)));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <Grid className={classes.header} alignItems="flex-end" container justify="space-between" spacing={3}>
                <Grid item>
                    <Typography variant="overline">
                        <FormattedMessage id="project.app.nav.catalog"/>
                    </Typography>
                    <Typography variant="h3">
                        <FormattedMessage id="project.catalog.ProductPage.title"/>
                    </Typography>
                </Grid>
            </Grid>
            <Grid className={classes.grid} container spacing={2}>
                {loading
                    ? <Box display="flex" justifyContent="center">
                        <CircularProgress/>
                    </Box>
                    : <Grid item md={8} xs={12}>
                        <ProductResult product={product}/>
                    </Grid>
                }
            </Grid>
        </div>
    );

};

export default ProductPage;
