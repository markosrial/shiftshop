import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useSnackbar} from 'notistack';
import {FormattedMessage} from 'react-intl';
import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    Grid,
    Radio,
    TextField,
    Typography
} from '@material-ui/core';
import {Add, AddBox} from '@material-ui/icons';

import useStyles from '../styles/AddUser';

import Role from '../constants/Role';
import {formValidator} from '../../../utils';
import * as actions from '../actions';
import {Alert, ErrorContent} from '../../common';
import RoleMultiSelector from './RoleMultiSelector';

const AddUser = () => {
    const classes = useStyles();

    const {enqueueSnackbar, closeSnackbar} = useSnackbar();

    const [userName, setUserName] = useState('');
    const [name, setName] = useState('');
    const [surnames, setSurnames] = useState('');
    const [roles, setRoles] = useState([]);
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [errors, setErrors] = useState(null);

    const [open, setOpen] = useState(false);
    const [changePassword, setChangePassword] = useState(false);
    const [adding, setAdding] = useState(false);

    const _isMounted = useRef(true);

    useEffect(() => {
        return () => _isMounted.current = false;
    }, []);

    const closeErrors = () => setErrors(null);
    const openDialog = () => setOpen(true);
    const closeDialog = () => setOpen(false);
    const handlePassPanel = _ => {

        if (changePassword) {
            setPassword('');
            setRepeatPassword('');
        }

        setChangePassword(!changePassword);

    };

    const resetForm = () => {
        if (_isMounted.current) {
            setUserName('');
            setName('');
            setSurnames('');
            setRoles([]);
            setChangePassword(false);
            setPassword('');
            setRepeatPassword('');
        }
    };

    const isValidUserName = useMemo(() => formValidator.isNotEmpty(userName), [userName]);
    const isValidPassword = useMemo(() => !changePassword || formValidator.isNotFullEmpty(password), [changePassword, password]);
    const isValidRepeatedPassword = useMemo(() => repeatPassword === password, [password, repeatPassword]);
    const isValidName = useMemo(() => formValidator.isNotEmpty(name), [name]);
    const isValidSurnames = useMemo(() => formValidator.isNotEmpty(surnames), [surnames]);
    const isValidRoles = useMemo(() => formValidator.isSomeRoleSelected(roles), [roles]);

    const checkValid = isValidUserName && isValidPassword && isValidRepeatedPassword && isValidName && isValidSurnames && isValidRoles;

    const handleSubmit = e => {

        e.preventDefault();
        closeErrors();

        if (checkValid && !adding) {
            addUser();
        }
    };

    const addUser = () => {

        if (adding) return;

        setAdding(true);

        const user = {
            userName: userName.trim(),
            password: changePassword ? password : null,
            name: name.trim(),
            surnames: surnames.trim(),
            roles
        };

        actions.addUser(user,
            _ => {
                enqueueSnackbar(<FormattedMessage id="project.users.AddUser.success"/>,
                    {
                        variant: 'success',
                        autoHideDuration: 1500,
                    });
                _isMounted.current && resetForm();
            },
            errors => {
                if (_isMounted.current) {
                    setErrors(errors)
                } else {
                    enqueueSnackbar(<ErrorContent errors={errors}/>,
                        {
                            variant: 'error',
                            persist: 'true',
                            action: key => (<Button color="inherit" variant="outlined" onClick={() => closeSnackbar(key)}>
                                <FormattedMessage id="project.global.button.close"/>
                            </Button>)
                        });
                }
            },
            () => _isMounted.current && setAdding(false));

    };

    return (
        <div>
            <Button variant="contained" color="primary" size="small" onClick={openDialog}>
                <Add/> <FormattedMessage id="project.users.AddUser.addButton"/>
            </Button>
            <Dialog className={classes.root} fullWidth scroll="body" open={open} onClose={closeDialog}>
                <DialogTitle>
                    <Box display="flex" alignItems="center">
                        <AddBox fontSize="default" color="primary"/>&nbsp;
                        <Typography variant="h5">
                            <FormattedMessage id="project.users.AddUser.title"/>
                        </Typography>
                    </Box>
                </DialogTitle>
                <form onSubmit={e => handleSubmit(e)} noValidate >
                    <DialogContent dividers>
                        {errors &&
                        <Alert className={classes.alert} message={errors} variant="error"
                               backendError onClose={closeErrors}/>}
                        <TextField margin="dense" variant="outlined" fullWidth disabled={adding} autoComplete="username"
                                   label={<FormattedMessage id="project.global.field.username"/>} value={userName} required
                                   onChange={e => setUserName(e.target.value)}/>
                        <TextField margin="dense" variant="outlined" fullWidth disabled={adding}
                                   label={<FormattedMessage id="project.global.field.name"/>} value={name} required
                                   onChange={e => setName(e.target.value)}/>
                        <TextField margin="dense" variant="outlined" fullWidth disabled={adding}
                                   label={<FormattedMessage id="project.global.field.surnames"/>} value={surnames} required
                                   onChange={e => setSurnames(e.target.value)}/>
                        <RoleMultiSelector margin="dense" variant="outlined" fullWidth disabled={adding} required
                                           selectedRoles={roles} handleSelectedRoles={e => setRoles(e.target.value.sort())}
                                           ignoreRoles={[Role.MANAGER]}/>
                        <ExpansionPanel className={classes.expansionPanel} expanded={changePassword} onChange={handlePassPanel} disabled={adding}>
                            <ExpansionPanelSummary
                                expandIcon={<Radio color="primary" checked={changePassword}/>}
                                aria-label="Expand">
                                <Box>
                                    <Typography variant="body1"><FormattedMessage id="project.users.AddUser.customPassword.title"/></Typography>
                                    <Typography variant="body2"><FormattedMessage id="project.users.AddUser.customPassword.message"/></Typography>
                                </Box>
                            </ExpansionPanelSummary>
                            <Divider/>
                            <ExpansionPanelDetails>
                                {changePassword && <Grid container spacing={1}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField margin="dense" variant="outlined" type="password" autoComplete="new-password" fullWidth disabled={adding}
                                                   label={<FormattedMessage id="project.global.field.password"/>} value={password}
                                                   onChange={e => setPassword(e.target.value)}/>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField margin="dense" variant="outlined" type="password" autoComplete="new-password" fullWidth disabled={adding}
                                                   label={<FormattedMessage id="project.global.field.repeatPassword"/>} value={repeatPassword}
                                                   onChange={e => setRepeatPassword(e.target.value)} error={!isValidRepeatedPassword}
                                                   helperText={!isValidRepeatedPassword && <FormattedMessage id="project.global.error.passwordMatch"/>}/>
                                    </Grid>
                                </Grid>}
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="secondary" onClick={closeDialog} disableElevation>
                            <FormattedMessage id="project.global.button.close"/>
                        </Button>
                        <Button variant="contained" color="primary" type="submit" disabled={!checkValid || adding} disableElevation>
                            {adding && <CircularProgress className={classes.buttonProgress} size={24}/>}
                            <FormattedMessage id="project.global.button.add"/>
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );

};

export default AddUser;
