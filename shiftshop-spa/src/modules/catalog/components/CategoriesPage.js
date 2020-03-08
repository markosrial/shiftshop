import React from 'react';
import {useSelector} from 'react-redux';
import {Grid, Typography} from '@material-ui/core';
import {FormattedMessage} from 'react-intl';

import useStyles from '../styles/CategoriesPage';

import users, {Role} from '../../users';
import AddCategory from './AddCategory';
import CategoriesList from './CategoriesList';

const CategoriesPage = () => {
    const classes = useStyles();

    const user = useSelector(users.selectors.getUser)
    const hasRole = roles => users.selectors.hasRole(user, roles);

    return (
        <div>
            <Grid className={classes.header} alignItems="flex-end" container justify="space-between" spacing={3}>
                <Grid item>
                    <Typography variant="overline">
                        <FormattedMessage id="project.app.nav.catalog"/>
                    </Typography>
                    <Typography variant="h3">
                        <FormattedMessage id="project.catalog.CategoriesPage.title"/>
                    </Typography>
                </Grid>
                {hasRole([Role.ADMIN]) &&
                    <Grid item>
                        <AddCategory/>
                    </Grid>}
            </Grid>
            <Grid className={classes.grid} container spacing={2}>
                <Grid item md={8} xs={12}>
                    <CategoriesList/>
                </Grid>
            </Grid>
        </div>
    );

};

export default CategoriesPage;
