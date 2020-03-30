import React, {useMemo, useState} from 'react';
import {FormattedMessage} from 'react-intl';
import {Box, Button, CircularProgress, Grid, TextField, Typography} from '@material-ui/core';
import {Error} from '@material-ui/icons';

import {useStyles} from '../styles/ServiceAuth';

import {formValidator} from '../../../utils';
import users from '../../users';

const ServiceAuth = ({nextStep}) => {

    const classes = useStyles();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLogging, setIsLogging] = useState(false);
    const [errors, setErrors] = useState(null);

    // TODO Try login servicetoken
    // useEffect(() => {}, [])

    const checkValid = useMemo(
    () => formValidator.isNotEmpty(username) && formValidator.isNotFullEmpty(password),
    [username, password]);

    const handleSubmit = event => {

        event.preventDefault();
        setErrors(null);

        if (checkValid && !isLogging) {
            login();
        }
    };

    const login = () => {

        setIsLogging(true);

        users.actions.serviceLogin(username, password,
            nextStep,
            errors => setErrors(errors),
            () => setIsLogging(false));
    };

    return (
        <form onSubmit={handleSubmit} noValidate>
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <TextField label={<FormattedMessage id="project.global.field.username"/>} value={username}
                               margin="dense" variant="outlined" required fullWidth
                               onChange={e => setUsername(e.target.value)} />
                </Grid>
                <Grid item xs={6}>
                    <TextField label={<FormattedMessage id="project.global.field.password"/>} value={password}
                               margin="dense" type="password" variant="outlined" required fullWidth
                               onChange={e => setPassword(e.target.value)}/>
                </Grid>
                <Grid item xs={12}>
                    <Box display="flex">
                        <Box flexGrow={1}>
                            {errors &&
                            <Typography className={classes.errorMessage} variant="subtitle2" color="error">
                                <Error className={classes.errorIcon}/>
                                {errors.globalError}
                            </Typography>}
                        </Box>
                        <Box>
                            <Button className={classes.submitButton} variant="contained" color="primary" size="small"
                                    type="submit" disabled={!checkValid || isLogging}>
                                {isLogging && <CircularProgress className={classes.buttonProgress} size={24}/>}
                                <FormattedMessage id="project.global.button.authenticate"/>
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </form>
    );
};

export default ServiceAuth;
