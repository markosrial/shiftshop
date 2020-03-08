import React from 'react';
import {useSelector} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {Grid, Typography} from '@material-ui/core';

import useStyles from '../styles/ProductsPage';

import users, {Role} from '../../users';
import AddProduct from './AddProduct';
import ProductsSearch from './ProductsSearch';

const ProductsPage = () => {

    const classes = useStyles();

    const user = useSelector(users.selectors.getUser);
    const hasRole = roles => users.selectors.hasRole(user, roles);

    return (
        <div>
            <Grid className={classes.header} alignItems="flex-end" container justify="space-between" spacing={3}>
                <Grid item>
                    <Typography variant="overline">
                        <FormattedMessage id="project.app.nav.catalog"/>
                    </Typography>
                    <Typography variant="h3">
                        <FormattedMessage id="project.catalog.ProductsPage.title"/>
                    </Typography>
                </Grid>
                {hasRole([Role.ADMIN]) &&
                    <Grid item>
                        <AddProduct/>
                    </Grid>}
            </Grid>
            <Grid className={classes.grid} container spacing={2}>
                <Grid item md={10} xs={12}>
                    <ProductsSearch/>
                </Grid>
            </Grid>
        </div>
    );
};

export default ProductsPage;
