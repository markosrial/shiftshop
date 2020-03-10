import React from 'react';
import {useHistory} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import {Button} from '@material-ui/core';
import {KeyboardBackspace} from '@material-ui/icons';

import useStyles from '../styles/BackButton';

const BackButton = () => {

    const classes = useStyles();

    const history = useHistory();

    if (history.length <= 2) {
        return null;
    }

    return (
        <Button className={classes.button} color="primary" variant="contained" size="small" disableElevation
                onClick={() => history.goBack()}>
            <KeyboardBackspace className={classes.icon} fontSize="small"/>
            <FormattedMessage id='project.global.button.back'/>
        </Button>
    );

};

export default BackButton;
