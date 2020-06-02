import React from 'react';
import {useHistory} from 'react-router-dom';
import {Box, IconButton} from '@material-ui/core';
import {AccountCircle} from '@material-ui/icons';

const ProfileMenu = () => {

    const history = useHistory();

    return (
        <Box color="light.main">
            <IconButton onClick={() => history.push('/profile')} color="inherit">
                <AccountCircle/>
            </IconButton>
        </Box>
    );
}


export default ProfileMenu;
