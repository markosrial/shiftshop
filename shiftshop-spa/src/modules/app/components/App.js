import React, {Fragment, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useSnackbar} from 'notistack';
import {LinearProgress} from '@material-ui/core';

import backend from '../../../backend';

import catalog from '../../catalog';
import users, {LoginPortal} from '../../users';
import Main from './Main';
import NetworkErrorMessage from './NetworkErrorMessage';

const reauthenticationCallback = dispatch => () => dispatch(users.actions.logout());

const App = () => {
    const dispatch = useDispatch();
    const loggedIn = useSelector(users.selectors.isLoggedIn);

    const [logging, setLogging] = useState(true);

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const netError = <NetworkErrorMessage/>;

        /* Configure backend proxy. */
        backend.init(_ => enqueueSnackbar(netError,
            {
                variant: 'error',
                anchorOrigin: {vertical: 'top', horizontal: 'center'},
                preventDuplicate: true,
                autoHideDuration: 2000,
            }));

        dispatch(
            users.actions.tryLoginFromServiceToken(
                () => dispatch(catalog.actions.findAllCategories()),
                () => setLogging(false),
                reauthenticationCallback(dispatch)));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        logging
        ? <LinearProgress color="secondary"/>
        : <Fragment>
                {loggedIn && <Main/>}
                {!loggedIn && <LoginPortal/>}
        </Fragment>

    );
};

export default App;
