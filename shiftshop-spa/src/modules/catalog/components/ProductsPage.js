import React from 'react';
import {FormattedMessage} from 'react-intl';
import {Grid, Typography} from '@material-ui/core';

import useStyles from '../styles/ProductsPage';

import AddProduct from './AddProduct';
import users, {Role} from '../../users';
import {useSelector} from 'react-redux';

const ProductsPage = () => {
    
    const classes = useStyles();

    const user = useSelector(users.selectors.getUser);

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
                {users.selectors.hasRole(user, [Role.ADMIN]) &&
                    <Grid item>
                        <AddProduct/>
                    </Grid>}
            </Grid>
            <Grid className={classes.grid} container spacing={2}>
                {/* Products search */}
            </Grid>
        </div>
    );
};

export default ProductsPage;
