import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useSnackbar} from 'notistack';
import {FormattedMessage} from 'react-intl';
import {Button} from '@material-ui/core';
import {DatePicker} from '@material-ui/pickers';
import {Search} from '@material-ui/icons';

import useStyles from '../styles/SalesSearchBar';

import * as actions from '../actions';
import * as selectors from '../selectors';
import {ErrorContent} from '../../common';

const initFrom = toDate => {

    let date = new Date(toDate);
    date.setDate(toDate.getDate() - 30);

    return date;

}

const SalesSearchBar = ({searching, startSearch, stopSearch}) => {

    const classes = useStyles();

    const {enqueueSnackbar, closeSnackbar} = useSnackbar();

    const dispatch = useDispatch();
    const salesSearch = useSelector(selectors.getSalesSearch);
    const searchFilter = useSelector(selectors.getSearchFilter);

    const [to, setTo] = useState(new Date());
    const [from, setFrom] = useState(initFrom(to));

    useEffect(() => {
        if (salesSearch) {
            setFrom(salesSearch.criteria.initDate || '');
            setTo(salesSearch.criteria.endDate || '');
        }
        // eslint-disable-next-line
    }, []);

    const handleChangeFrom = from => {

        if (from > to) {
            setTo(from);
        }
        setFrom(from);

    }

    const search = () => {

        if (searching) return;

        startSearch();

        const criteria = {
            initDate: from,
            endDate: to,
            page: 0,
            ...searchFilter
        };

        dispatch(actions.findSales(criteria,
                errors => enqueueSnackbar(<ErrorContent errors={errors}/>,
                    {variant: 'error', persist: 'true',
                        action: key => (<Button color="inherit" variant="outlined" onClick={() => closeSnackbar(key)}>
                            <FormattedMessage id="project.global.button.close"/>
                        </Button>)}),
                stopSearch));

    };

    const handleSubmit = event => {
        event.preventDefault();
        search();
    };

    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <DatePicker className={classes.dayFrom} inputVariant="outlined"
                        margin="dense" format="dd/MM/yyyy" fullWidth
                        label={<FormattedMessage id="project.global.field.from"/>}
                        variant="inline" disabled={searching} disableFuture
                        value={from} onChange={handleChangeFrom} autoOk/>
            <DatePicker className={classes.dayTo} inputVariant="outlined"
                        margin="dense" format="dd/MM/yyyy" fullWidth
                        label={<FormattedMessage id="project.global.field.to"/>}
                        variant="inline" disabled={searching}
                        minDate={from} disableFuture
                        value={to} onChange={setTo} autoOk/>
            <Button className={classes.searchButton} variant="contained" fullWidth
                    size="small" color="primary" type="submit" disabled={searching}
                    disableElevation>
                <Search/>
            </Button>
        </form>
    );

}

export default SalesSearchBar;
