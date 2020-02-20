import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Hidden,
    IconButton,
    Typography
} from '@material-ui/core';
import {Close, ExitToApp} from '@material-ui/icons';

import useStyles from '../styles/LogOut';

import * as actions from '../actions';

const LogOut = () => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const history = useHistory();

    const [open, setOpen] = useState(false);

    const openDialog = () => setOpen(true);
    const closeDialog = () => setOpen(false);

    const logout = () => {
        dispatch(actions.logout());
        history.push('/');
    };

    return (
        <div>
            <Button className={classes.logoutButton} color="inherit" onClick={openDialog}>
                <ExitToApp/>
                <Hidden xsDown>
                    <span className={classes.logoutText}>
                        <FormattedMessage id="project.global.button.signout"/>
                    </span>
                </Hidden>
            </Button>
            <Dialog className={classes.root} fullWidth maxWidth="xs" open={open} onClose={closeDialog}>
                <DialogTitle>
                    <Typography component="span" variant="h4">
                        <FormattedMessage id="project.usuario.Logout.title"/>
                    </Typography>
                    <IconButton className={classes.closeButton} onClick={closeDialog}>
                        <Close/>
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <DialogContentText>
                        <Typography component="span" variant="subtitle1">
                            <FormattedMessage id="project.usuario.Logout.message"/>
                        </Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="secondary" onClick={closeDialog}>
                        <FormattedMessage id="project.global.button.cancel"/>
                    </Button>
                    <Button variant="contained" color="primary" autoFocus onClick={logout}>
                        <FormattedMessage id="project.global.button.continue"/>
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default LogOut;
