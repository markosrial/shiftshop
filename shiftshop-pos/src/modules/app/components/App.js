import React, {Fragment} from 'react';
import {useSelector} from 'react-redux';

import Main from './Main';
import users, {LoginPortal} from '../../users';

const App = () => {

    const loggedIn = useSelector(users.selectors.isLoggedIn);

    return (
        <Fragment>
            {loggedIn && <Main/>}
            {!loggedIn && <LoginPortal/>}
        </Fragment>
    );
};

export default App;
