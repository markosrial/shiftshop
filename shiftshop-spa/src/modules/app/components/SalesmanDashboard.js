import React from 'react';
import {FormattedMessage} from 'react-intl';
import {Grid,Typography} from '@material-ui/core';

import {BestSellingProducts, MonthProductsSold, MonthSalesCount} from '../../sales';

const SalesmanDashboard = () => (
    <Grid container spacing={2} justify="center">
        <Grid item container spacing={2} xs={12} md={6} alignContent="flex-start">
            <Grid item xs={12}>
                <Typography variant="overline">
                    <FormattedMessage id="project.app.Dashboard.last30Days"/>
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={12}>
                <MonthSalesCount/>
            </Grid>
            <Grid item xs={12} sm={6} md={12}>
                <MonthProductsSold/>
            </Grid>
        </Grid>
        <Grid item container spacing={2} xs={12} md={6}>
            <Grid item xs={12}>
                <Typography variant="overline">
                    <FormattedMessage id="project.app.Dashboard.last15Days"/>
                </Typography>
            </Grid>
            <Grid item xs={12} >
                <BestSellingProducts/>
            </Grid>
        </Grid>
    </Grid>
);

export default SalesmanDashboard;
