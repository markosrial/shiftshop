import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {useSnackbar} from 'notistack';
import {FormattedMessage} from 'react-intl';
import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography
} from '@material-ui/core';

import useStyles from '../../catalog/styles/EditCategory';

import {formValidator} from '../../../utils';
import Role from '../constants/Role';
import * as actions from '../actions';
import * as selectors from '../selectors';
import {Alert, ErrorContent} from '../../common';
import RoleMultiSelector from './RoleMultiSelector';

const EditUser = ({user, onEdit, onClose}) => {
    const classes = useStyles();

    const {enqueueSnackbar, closeSnackbar} = useSnackbar();

    const roles = useSelector(selectors.getRoles);

    const [name, setName] = useState('');
    const [surnames, setSurnames] = useState('');
    const [userRoles, setUserRoles] = useState([]);
    const [updating, setUpdating] = useState(false);
    const [errors, setErrors] = useState(null);

    const closeErrors = () => setErrors(null);

    const _isMounted = useRef(true);
    useEffect(() => {
        return () => _isMounted.current = false
    }, []);

    const isValidName = useMemo(() => formValidator.isNotEmpty(name), [name]);
    const isValidSurnames = useMemo(() => formValidator.isNotEmpty(surnames), [surnames]);
    const isValidRoles = useMemo(() => formValidator.isSomeRoleSelected(userRoles), [userRoles]);
    const isManager = useMemo(() => {

        if (!user) {
            return;
        }

        const managerRole = selectors.getRoleByName(roles, Role.MANAGER);


        if (!managerRole) {
            return false;
        }

        return user.roles.includes(managerRole.id)

    }, [user, roles]);

    const checkValid = isValidName || isValidSurnames || isValidRoles;


    const handleSubmit = e => {

        e.preventDefault();
        closeErrors();

        if (checkValid && !updating) {
            editUser();
        }
    };

    const editUser = () => {

        if (updating) return;

        setUpdating(true);

        const data = {
            name: isValidName ? name.trim() : null,
            surnames: isValidSurnames ? surnames.trim() : null,
            roles : isValidRoles ? userRoles : null
        };

        actions.updateUser(
            user.id, data,
            _ => {
                enqueueSnackbar(<FormattedMessage id="project.users.EditUser.success"/>,
                    {
                        variant: 'success',
                        autoHideDuration: 1500,
                    });
                onEdit();
                onClose();
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
            () => _isMounted.current && setUpdating(false));

    };

    if (!user || !onClose) {
        return null;
    }

    return (
        <Dialog open fullWidth scroll="body" onClose={onClose}>
            <DialogTitle>
                <Typography component="span" variant="h5">
                    <FormattedMessage id="project.users.EditUser.title"/>: <i>{user.name} {user.surnames}</i>
                </Typography>
            </DialogTitle>
            <form onSubmit={e => handleSubmit(e)} noValidate>
                <DialogContent dividers>
                    {errors && <Alert className={classes.alert} variant="error" message={errors} onClose={closeErrors} backendError/>}
                    <TextField autoFocus margin="dense" type="text" variant="outlined" fullWidth disabled={updating}
                               label={<FormattedMessage id="project.global.field.name"/>}
                               value={name} onChange={e => setName(e.target.value)}/>
                    <TextField margin="dense" type="text" variant="outlined" fullWidth disabled={updating}
                               label={<FormattedMessage id="project.global.field.surnames"/>}
                               value={surnames} onChange={e => setSurnames(e.target.value)}/>
                    <RoleMultiSelector margin="dense" variant="outlined" fullWidth disabled={updating}
                                       selectedRoles={userRoles} handleSelectedRoles={e => setUserRoles(e.target.value.sort())}
                                       ignoreRoles={isManager ? [] : [Role.MANAGER]}/>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" size="small" color="default" onClick={onClose} disableElevation>
                        <FormattedMessage id="project.global.button.cancel"/>
                    </Button>
                    <Button variant="contained" size="small" color="primary" type="submit" disableElevation
                            disabled={!checkValid || updating}>
                        <FormattedMessage id="project.global.button.accept"/>
                        {updating && <CircularProgress className={classes.buttonProgress} size={24}/>}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default EditUser;
