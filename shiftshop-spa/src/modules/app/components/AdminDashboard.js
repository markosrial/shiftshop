import React from 'react';
import {FormattedMessage} from 'react-intl';
import {Grid, Typography} from '@material-ui/core';

import {
    BestSellingProducts,
    MonthProductsSold,
    MonthSalesCount,
    MonthSalesProfit,
    MonthSalesTotal,
    ProfitableProducts, YearSalesResume
} from '../../sales';

const AdminDashboard = () => (
    <Grid container spacing={2} justify="center">
        <Grid item xs={12}>
            <Typography variant="overline">
                <FormattedMessage id="project.app.Dashboard.last30Days"/>
            </Typography>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
            <MonthSalesCount/>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
            <MonthProductsSold/>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
            <MonthSalesTotal/>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
            <MonthSalesProfit/>
        </Grid>
        <Grid item xs={12}>
            <Typography variant="overline">
                <FormattedMessage id="project.app.Dashboard.last15Days"/>
            </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
            <BestSellingProducts/>
        </Grid>
        <Grid item xs={12} sm={6}>
            <ProfitableProducts/>
        </Grid>
        <Grid item xs={12}>
            <YearSalesResume/>
        </Grid>
    </Grid>
);

export default AdminDashboard;
