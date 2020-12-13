import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {useSnackbar} from 'notistack';
import {FormattedMessage} from 'react-intl';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    CircularProgress,
    Divider,
    Grid,
    TextField
} from '@material-ui/core';

import useStyles from '../styles/ChangePassword';

import {formValidator} from '../../../utils';
import {ErrorContent} from '../../common';
import * as actions from '../actions';
import * as selectors from '../selectors';

const ChangePassword = () => {

    const classes = useStyles();

    const user = useSelector(selectors.getUser);

    const {enqueueSnackbar, closeSnackbar} = useSnackbar();

    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [updating, setUpdating] = useState(false);

    const _isMounted = useRef(true);

    useEffect(() => {
        return () => _isMounted.current = false;
    }, []);

    const isValidPasswords = useMemo(
        () => formValidator.isNotFullEmpty(password) && formValidator.isNotFullEmpty(newPassword),
        [password, newPassword]);
    const isValidRepeatedPassword = useMemo(() => repeatPassword === newPassword, [newPassword, repeatPassword]);
    const checkValid = isValidPasswords && isValidRepeatedPassword;

    const resetForm = () => {
        if (_isMounted.current) {
            setPassword('');
            setNewPassword('');
            setRepeatPassword('');
        }
    };

    const handleSubmit = e => {

        e.preventDefault();

        if (checkValid && !updating) {
            changePassword();
        }

    };

    const changePassword = () => {

        if (updating) return;

        setUpdating(true);

        actions.changePassword(user.id, password, newPassword,
            _ => {
                enqueueSnackbar(<FormattedMessage id="project.users.ChangePassword.success"/>,
                    {
                        variant: 'success',
                        autoHideDuration: 1500,
                    });
                resetForm();
            },
            errors => enqueueSnackbar(<ErrorContent errors={errors}/>, { variant: 'error', persist: 'true',
                action: key => (<Button color="inherit" variant="outlined" onClick={() => closeSnackbar(key)}>
                    <FormattedMessage id="project.global.button.close"/>
                </Button>)
            }),
            () => _isMounted.current && setUpdating(false));

    };

    return (
        <Card>
            <CardHeader title={<FormattedMessage id="project.users.ChangePassword.title"/>}/>
            <Divider/>
            <CardContent>
                <Box width={1} display="flex" justifyContent="center">
                    <form onSubmit={handleSubmit} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField margin="dense" variant="outlined" type="password" autoComplete="new-password" fullWidth disabled={updating}
                                           label={<FormattedMessage id="project.global.field.currentPassword"/>} value={password}
                                           onChange={e => setPassword(e.target.value)}/>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField margin="dense" variant="outlined" type="password" autoComplete="new-password" fullWidth disabled={updating}
                                           label={<FormattedMessage id="project.global.field.newPassword"/>} value={newPassword}
                                           onChange={e => setNewPassword(e.target.value)}/>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField margin="dense" variant="outlined" type="password" autoComplete="new-password" fullWidth disabled={updating}
                                           label={<FormattedMessage id="project.global.field.repeatPassword"/>} value={repeatPassword}
                                           onChange={e => setRepeatPassword(e.target.value)} error={!isValidRepeatedPassword}
                                           helperText={!isValidRepeatedPassword && <FormattedMessage id="project.global.error.passwordMatch"/>}/>
                            </Grid>
                            <Grid item xs={12}>
                                <Button className={classes.button} variant="contained" color="primary" type="submit" disabled={!checkValid || updating} disableElevation>
                                    {updating && <CircularProgress className={classes.buttonProgress} size={24}/>}
                                    <FormattedMessage id="project.global.button.update"/>
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </CardContent>
        </Card>
    );


}

export default ChangePassword;
