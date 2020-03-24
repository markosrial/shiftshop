import React, {useEffect, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {Button, Typography, CircularProgress, TextField} from '@material-ui/core';
import {Error} from '@material-ui/icons';

import useStyles from '../styles/LoginForm';

import * as actions from '../actions';
import catalog from '../../catalog';
import {formValidator} from '../../../utils';

const LoginForm = () => {
    const classes = useStyles();

    const _isMounted = useRef(true);
    useEffect(() => {
        return () => _isMounted.current = false
    }, []);

    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLogging, setIsLogging] = useState(false);
    const [errors, setErrors] = useState(null);

    const checkValid = () => {
        return formValidator.isNotEmpty(username)
            && formValidator.isNotFullEmpty(password)
    };

    const handleSubmit = event => {

        event.preventDefault();
        setErrors(null);

        if (checkValid() && !isLogging) {
            login();
        }
    };

    const login = () => {

        setIsLogging(true);

        dispatch(actions.login(username, password,
            () => dispatch(catalog.actions.findAllCategories()),
            errors => _isMounted.current && setErrors(errors),
            () => _isMounted.current && setIsLogging(false),
            () => dispatch(actions.logout())
        ));

    };

    return (
        <form className={classes.root} onSubmit={e => handleSubmit(e)} noValidate>
            <TextField label={<FormattedMessage id="project.global.field.username"/>} value={username} margin="normal"
                       variant="outlined" onChange={e => setUsername(e.target.value)} required fullWidth/>
            <TextField label={<FormattedMessage id="project.global.field.password"/>} value={password} margin="normal"
                       type="password" variant="outlined" onChange={e => setPassword(e.target.value)} required fullWidth/>
            {errors &&
            <Typography className={classes.errorMessage} variant="subtitle2" color="error">
                <Error className={classes.errorIcon}/>
                {errors.globalError}
            </Typography>}
            <Button className={classes.submitButton} variant="contained" color="primary" size="large"
                    type="submit" disabled={!checkValid() || isLogging} fullWidth>
                {isLogging && <CircularProgress className={classes.buttonProgress} size={24}/>}
                <FormattedMessage id="project.global.button.login"/>
            </Button>
        </form>
    );
};

export default LoginForm;
