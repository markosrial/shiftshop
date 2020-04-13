import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {useSnackbar} from 'notistack';
import Bcrypt from 'bcryptjs';
import {Button, CircularProgress, TextField, Typography} from '@material-ui/core';
import {Error} from '@material-ui/icons';

import {useStyles} from '../styles/LoginForm';

import {formValidator} from '../../../utils';
import * as actions from '../actions';
import {UsersDB} from '../../../databases';
import {minDelayFunction} from '../../utils';
import * as selectors from '../../sync/selectors';

const LoginForm = () => {
    const classes = useStyles();

    const {enqueueSnackbar, closeSnackbar} = useSnackbar();

    const _isMounted = useRef(true);
    useEffect(() => {return () => {_isMounted.current = false}}, []);

    const dispatch = useDispatch();
    const localUpdateTimestamp = useSelector(selectors.getLocalUpdateTimestamp);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLogging, setIsLogging] = useState(false);
    const [errors, setErrors] = useState(null);
    const [usersDB, setUsersDB] = useState(null);

    useEffect(() => {

        // Clear when a update is completed to reload usersDB on new load try
        if (usersDB !== null && localUpdateTimestamp !== '') {
            usersDB.close();
            setUsersDB(null);
        }

    }, [localUpdateTimestamp]);

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

        if (!usersDB) {

            const db = UsersDB.instantiate();
            setUsersDB(db);

            checkUser(db, username, password);

        } else {
            checkUser(usersDB, username, password);
        }

    };

    const successLogin = user => {
        setIsLogging(false);
        dispatch(actions.login(user));
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

        const delay = minDelayFunction(300);

        usersDB.getById(username)
            .then(user => {

                if (Bcrypt.compareSync(password, user.password)) {

                    usersDB.close();

                    const {id, userName, name} = user;
                    successLogin({id, userName, name});

                } else {
                    throw new Error();
                }

            })
            .catch(() => {
                delay(() => {
                    errorLogin("project.users.LoginForm.invalidLogin");
                    setIsLogging(false);
                });
            })
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
