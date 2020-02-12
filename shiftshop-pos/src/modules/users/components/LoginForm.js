import React, {useEffect, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {useSnackbar} from 'notistack';
import {Button, Typography, CircularProgress, TextField} from '@material-ui/core';
import {Error} from '@material-ui/icons';

import {useStyles} from './LoginFormStyles';

import {formValidator} from '../../../utils';
import * as actions from '../actions';
import {UsersDB} from '../../../databases';

const LoginForm = () => {
    const classes = useStyles();

    const {enqueueSnackbar, closeSnackbar} = useSnackbar();

    const _isMounted = useRef(true);
    useEffect(() => {return () => {_isMounted.current = false}}, []);

    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLogging, setIsLogging] = useState(false);
    const [errors, setErrors] = useState(null);
    const [usersDB, setUsersDB] = useState(null);

    const checkValid = () => {
        return formValidator.isNotEmpty(username)
            && formValidator.isNotEmpty(password)
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

        if (!usersDB) {
            UsersDB.init()
                .then(usersDB => { setUsersDB(usersDB); checkUser(usersDB, username, password); })
                .catch(err => errorDB(err));
        } else {
            checkUser(usersDB, username, password);
        }

    };

    const successLogin = () => {
        setIsLogging(false);
        dispatch(actions.login(username, password));
    };

    const errorLogin = error => {
        setIsLogging(false);
        setErrors({globalError: error});
    };

    const errorDB = error => {
        setIsLogging(false);
        enqueueSnackbar(<FormattedMessage id={`project.bd.error.${error}`}/>, {
                variant: 'error',
                action: key => (<Button color="inherit" variant="outlined" onClick={() => closeSnackbar(key)}>
                    <FormattedMessage id="project.global.button.close"/>
                </Button>)
            });
    };

    const checkUser = (usersDB, username, password) => {
        usersDB.getByUsername(username).then(user => {
            if (user && user.username === username && user.password === password) {
                usersDB.close();
                successLogin();
            } else {
               errorLogin("project.users.LoginForm.invalidLogin")
            }
        }).catch(err => errorDB(err));
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
                <FormattedMessage id={errors.globalError}/>
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
