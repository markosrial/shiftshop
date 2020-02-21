import React from 'react';
import {useSelector} from 'react-redux';
import {Grid, Typography} from '@material-ui/core';
import {FormattedMessage} from 'react-intl';

import useStyles from '../styles/CategoriesPage';

import AddCategory from './AddCategory';

import users, {Role} from '../../users';

const CategoriesPage = () => {
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
                        <FormattedMessage id="project.catalog.CategoriesPage.title"/>
                    </Typography>
                </Grid>
                {users.selectors.hasRole(user, [Role.ADMIN]) &&
                    <Grid item>
                        <AddCategory/>
                    </Grid>}
            </Grid>
            <Grid className={classes.grid} container spacing={2}>
                {/* Page content */}
            </Grid>
        </div>
    );

};

export default CategoriesPage;
