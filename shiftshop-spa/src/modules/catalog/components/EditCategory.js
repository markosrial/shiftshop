import React, {useEffect, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {useSnackbar} from 'notistack';
import PropTypes from 'prop-types';
import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField, Typography
} from '@material-ui/core';

import useStyles from '../styles/EditCategory';

import * as actions from '../actions';
import {Alert, ErrorContent} from '../../common';

const EditCategory = ({category, onClose}) => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();

    const _isMounted = useRef(true);
    useEffect(() => {
        return () => _isMounted.current = false
    }, []);

    const [name, setName] = useState('');
    const [updating, setUpdating] = useState(false);
    const [errors, setErrors] = useState(null);

    const closeErrors = () => setErrors(null);

    const checkValid = name.trim() !== '';

    const handleSubmit = e => {

        e.preventDefault();
        closeErrors();

        if (checkValid && !updating) {
            editCategory();
        }
    };

    const editCategory = () => {

        if (updating) return;

        setUpdating(true);

        dispatch(
            actions.updateCategory(
                category.id,
                {name: name.trim()},
                _ => {
                    enqueueSnackbar(<FormattedMessage id="project.catalog.EditCategory.success"/>,
                        {
                            variant: 'success',
                            autoHideDuration: 1500,
                        });
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
                () => _isMounted.current && setUpdating(false)));

    };

    if (!category || !onClose) {
        return null;
    }

    return (
        <Dialog open maxWidth="xs" fullWidth onClose={onClose}>
            <DialogTitle>
                <Typography component="span" variant="h5">
                    <FormattedMessage id="project.catalog.EditCategory.title"/>: <i>{category.name}</i>
                </Typography>
            </DialogTitle>
            <form onSubmit={e => handleSubmit(e)} noValidate>
                <DialogContent dividers>
                    {errors && <Alert className={classes.alert} variant="error" message={errors} onClose={closeErrors} backendError/>}
                    <TextField autoFocus margin="dense" type="text" variant="outlined" fullWidth
                               label={<FormattedMessage id="project.global.field.name"/>}
                               value={name} onChange={e => setName(e.target.value)}/>
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

EditCategory.propTypes = {
    category: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired
};

export default EditCategory;
