import React from 'react';
import {FormattedMessage} from 'react-intl';
import {Grid, Typography} from '@material-ui/core';

import useStyles from '../styles/Dashboard'

const Dashboard = () => {
    const classes = useStyles();

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
                <Grid item>
                    <div/>
                </Grid>
            </Grid>
            <Grid className={classes.grid} container spacing={2}>
                <Grid item md={10} xs={12}>
                    <div/>
                </Grid>
            </Grid>
        </div>
    );
};

export default Dashboard;
