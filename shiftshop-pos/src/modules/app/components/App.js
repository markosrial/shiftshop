import React, {Fragment, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {useSnackbar} from 'notistack';

import backend from '../../../backend';

import Main from './Main';
import users, {LoginPortal} from '../../users';

const NetworkErrorMessage = () => (
    <div>
        <FormattedMessage id="project.app.NetworkErrorMessage.title"/>:<br/>
        <FormattedMessage id="project.app.NetworkErrorMessage.message"/> ...
    </div>
);

const App = () => {

    const { enqueueSnackbar } = useSnackbar();

    const loggedIn = useSelector(users.selectors.isLoggedIn);

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

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Fragment>
            {loggedIn && <Main/>}
            {!loggedIn && <LoginPortal/>}
        </Fragment>
    );
};

export default App;
