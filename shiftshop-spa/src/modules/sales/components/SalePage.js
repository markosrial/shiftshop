import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {Box, CircularProgress, Grid, Typography} from '@material-ui/core';

import useStyles from '../styles/SalePage';

import * as actions from '../actions';
import * as selectors from '../selectors';
import {BackButton} from '../../common';
import SaleResult from './SaleResult';

const SalePage = () => {

    // Styles
    const classes = useStyles();

    // State & store
    const dispatch = useDispatch();
    const sale = useSelector(selectors.getSale);

    const [loading, setLoading] = useState(true);

    // Path
    const {barcode} = useParams();

    // Effects
    useEffect(() => {

        dispatch(actions.getSale(barcode, () => setLoading(false)));

        return () => dispatch(actions.clearSale());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <Grid className={classes.header} alignItems="flex-end" container justify="space-between" spacing={2}>
                <Grid item>
                    <Typography variant="overline">
                        <FormattedMessage id="project.app.nav.sales"/>
                    </Typography>
                    <Typography variant="h3">
                        <FormattedMessage id="project.sales.SalePage.title"/>
                    </Typography>
                </Grid>
                <Grid item><BackButton/></Grid>
            </Grid>
            <Grid className={classes.grid} container spacing={2}>
                {loading
                    ? <Box display="flex" justifyContent="center">
                        <CircularProgress/>
                    </Box>
                    : <Grid item md={8} xs={12}>
                        <SaleResult sale={sale}/>
                    </Grid>
                }
            </Grid>
        </div>
    );

}

export default SalePage;
