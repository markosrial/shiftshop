import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {useSnackbar} from 'notistack';
import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography
} from '@material-ui/core';
import {Add, AddBox} from '@material-ui/icons';

import useStyles from '../styles/AddCategory';

import * as actions from '../actions';
import {formValidator} from '../../../utils';
import {Alert, ErrorContent} from '../../common';

const AddCategory = () => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();

    const _isMounted = useRef(true);
    useEffect(() => {
        return () => _isMounted.current = false
    }, []);

    const [name, setName] = useState('');
    const [adding, setAdding] = useState(false);
    const [errors, setErrors] = useState(null);
    const [open, setOpen] = useState(false);

    const handleChangeName = event => {
        setName(event.target.value);
    };

    const closeErrors = () => setErrors(null);
    const openDialog = () => setOpen(true);
    const closeDialog = () => setOpen(false);

    const isValidName = useMemo(() => formValidator.isNotEmpty(name), [name]);

    const handleSubmit = e => {

        e.preventDefault();
        closeErrors();

        if (isValidName && !adding) {
            addCategory();
        }
    };

    const addCategory = () => {

        if (adding) return;

        setAdding(true);

        const categoryName = name.trim();

        dispatch(actions.addCategory({name: categoryName},
                _ => {
                enqueueSnackbar(<FormattedMessage id="project.catalog.AddCategory.success"/>,
                    {
                        variant: 'success',
                        autoHideDuration: 1500,
                    });
                _isMounted.current && setName('');
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
            () => _isMounted.current && setAdding(false)));

    };

    return (
        <div>
            <Button color="primary" variant="contained" size="small" onClick={openDialog}>
                <Add/> <FormattedMessage id="project.catalog.AddCategory.addButton"/>
            </Button>
            <Dialog className={classes.root} maxWidth="xs" fullWidth open={open} onClose={closeDialog}>
                <DialogTitle>
                    <Box display="flex" alignItems="center">
                        <AddBox fontSize="default" color="primary"/>&nbsp;
                        <Typography variant="h5">
                            <FormattedMessage id="project.catalog.AddCategory.title"/>
                        </Typography>
                    </Box>
                </DialogTitle>
                <form onSubmit={e => handleSubmit(e)} noValidate>
                    <DialogContent dividers>
                        {errors && <Alert className={classes.alert} message={errors} backendError onClose={closeErrors}
                                          variant="error"/>}
                        <TextField margin="dense" variant="outlined" fullWidth autoFocus disabled={adding}
                                   label={<FormattedMessage id="project.global.field.name"/>} value={name}
                                   onChange={handleChangeName} required/>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="secondary" onClick={closeDialog} disableElevation>
                            <FormattedMessage id="project.global.button.close"/>
                        </Button>
                        <Button variant="contained" color="primary" type="submit" disabled={!isValidName || adding} disableElevation>
                            {adding && <CircularProgress className={classes.buttonProgress} size={24}/>}
                            <FormattedMessage id="project.global.button.add"/>
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
};

export default AddCategory;
