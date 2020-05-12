import React, {useEffect, useState} from 'react';
import {Box} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {useSnackbar} from 'notistack';
import {FormattedMessage} from 'react-intl';
import {DatePicker} from '@material-ui/pickers';

import useStyles from '../styles/RecordsFrame';

import * as actions from '../actions';
import * as selectors from '../selectors';
import RecordsCard from './RecordsCard';
import UploadSalesDialog from './UploadSalesDialog';

const RecordsFrame = () => {

    const classes = useStyles();

    const dispatch = useDispatch();
    const {enqueueSnackbar} = useSnackbar();

    const salesDB = useSelector(selectors.getSalesDB)
    const recordsDateFilter = useSelector(selectors.getRecordsDateFilter);

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        setLoading(true);

        dispatch(actions.getSalesByDate(salesDB, recordsDateFilter,
            () => enqueueSnackbar(
                <FormattedMessage id="project.records.RecordsTable.loadError"/>, {variant: 'error'}),
            () => setLoading(false)));

    }, []);

    const loadDateRecords = date => {

        if (loading) return;

        setLoading(true);

        dispatch(actions.getSalesByDate(salesDB, date,
            () => enqueueSnackbar(
                <FormattedMessage id="project.records.RecordsTable.loadError"/>,
                {variant: 'error'}),
            () => setLoading(false)));

    }

    return (
        <Box className={classes.content}>
            <Box width={1} mb={1} display="flex" alignItems="center">
                <UploadSalesDialog/>
                <Box flexGrow={1}/>
                <DatePicker inputVariant="outlined" margin="dense" format="dd/MM/yyyy"
                            label={<FormattedMessage id="project.global.field.saleDate"/>}
                            variant="inline" disabled={loading} disableFuture
                            value={recordsDateFilter} onChange={loadDateRecords} autoOk/>
            </Box>
            <Box className={classes.recordsTable}>
                <RecordsCard loading={loading}/>
            </Box>
        </Box>
    );

};

export default RecordsFrame;
