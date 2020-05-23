import React from 'react';
import {useSelector} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {Grid, Typography} from '@material-ui/core';

import useStyles from '../styles/Dashboard';

import users, {Role} from '../../users';
import AdminDashboard from './AdminDashboard';
import SalesmanDashboard from './SalesmanDashboard';


const Dashboard = () => {

    const classes = useStyles();

    const user = useSelector(users.selectors.getUser);
    const hasRole = roles => users.selectors.hasRole(user, roles);

    return (
        <div>
            <Grid className={classes.header} alignItems="flex-end" container justify="space-between" spacing={3}>
                <Grid item>
                    <Typography variant="overline">
                        <FormattedMessage id="project.app.nav.root"/>
                    </Typography>
                    <Typography variant="h3">
                        <FormattedMessage id="project.app.Dashboard.title"/>
                    </Typography>
                </Grid>
            </Grid>
            {hasRole([Role.MANAGER, Role.ADMIN]) ? <AdminDashboard/> : <SalesmanDashboard/>}
        </div>
    );
};

export default Dashboard;
