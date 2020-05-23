import React from 'react';
import {FormattedMessage} from 'react-intl';
import {Grid, Typography} from '@material-ui/core';

import useStyles from '../styles/SalesPage';

import SalesSearch from './SalesSearch';
import BarcodeAutocomplete from './BarcodeAutocomplete';

const SalesPage = () => {

    const classes = useStyles();

    return (
        <div>
            <Grid className={classes.header} alignItems="flex-end" container justify="space-between" spacing={3}>
                <Grid item>
                    <Typography variant="overline">
                        <FormattedMessage id="project.app.nav.sales"/>
                    </Typography>
                    <Typography variant="h3">
                        <FormattedMessage id="project.sales.SalesPage.title"/>
                    </Typography>
                </Grid>
                <Grid item><BarcodeAutocomplete/></Grid>
            </Grid>
            <Grid className={classes.grid} container spacing={2}>
                <Grid item md={10} xs={12}>
                    <SalesSearch/>
                </Grid>
            </Grid>
        </div>
    );
};

export default SalesPage;
