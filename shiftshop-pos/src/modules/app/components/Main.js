import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button} from '@material-ui/core';

import users from '../../users';
import shopping from '../../shopping';

const Main = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(shopping.actions.loadCatalog(error => console.log(error)));
    }, []);

    return (
        <div>
            Successfully logged!
            <Button color="primary" variant="contained" onClick={() => dispatch(users.actions.logout())}>Logout</Button>
        </div>
    );

};

export default Main;
