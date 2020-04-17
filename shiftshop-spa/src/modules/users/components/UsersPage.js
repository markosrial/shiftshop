import React from 'react';
import {FormattedMessage} from 'react-intl';
import {Grid, Typography} from '@material-ui/core';

import useStyles from '../styles/UsersPage';

import UsersSearch from './UsersSearch';
import AddUser from './AddUser';

const UsersPage = () => {

    const classes = useStyles();

    return (
        <div>
            <Grid className={classes.header} alignItems="flex-end" container justify="space-between" spacing={3}>
                <Grid item>
                    <Typography variant="overline">
                        <FormattedMessage id="project.app.nav.staff"/>
                    </Typography>
                    <Typography variant="h3">
                        <FormattedMessage id="project.users.UsersPage.title"/>
                    </Typography>
                </Grid>
                <Grid item>
                    <AddUser/>
                </Grid>
            </Grid>
            <Grid className={classes.grid} container spacing={2}>
                <Grid item md={10} xs={12}>
                    <UsersSearch/>
                </Grid>
            </Grid>
        </div>
    );
};

export default UsersPage;
