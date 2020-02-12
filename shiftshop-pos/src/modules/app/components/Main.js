import React from 'react';
import {useDispatch} from 'react-redux';
import {Button} from '@material-ui/core';

import users from '../../users';

const Main = () => {

    const dispatch = useDispatch();

    return (
        <div>
            Successfully logged!
            <Button color="primary" variant="contained" onClick={() => dispatch(users.actions.logout())}>Logout</Button>
        </div>
    );

};

export default Main;
