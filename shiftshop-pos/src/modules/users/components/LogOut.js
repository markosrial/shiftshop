import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Typography
} from '@material-ui/core';
import {Error, Close, ExitToApp} from '@material-ui/icons';

import useStyles from '../styles/LogOut';

import * as actions from '../actions';
import sales from '../../sales';

const LogOut = () => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const cartCount = useSelector(sales.selectors.getShoppingCartCount);

    const [open, setOpen] = useState(false);

    const openDialog = () => setOpen(true);
    const closeDialog = () => setOpen(false);

    const logout = () => {
        dispatch(actions.logout());
    };

    return (
        <div>
            <IconButton color="inherit" onClick={openDialog}>
                <ExitToApp/>
            </IconButton>
            <Dialog className={classes.root} fullWidth maxWidth="xs" scroll="body" open={open} onClose={closeDialog}>
                <DialogTitle>
                    <Typography component="span" variant="h4">
                        <FormattedMessage id="project.users.Logout.title"/>
                    </Typography>
                    <IconButton className={classes.closeButton} onClick={closeDialog}>
                        <Close/>
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <Box>
                        <Typography component="span" variant="subtitle1">
                            <FormattedMessage id="project.users.Logout.message"/>
                        </Typography>
                    </Box>
                    {(cartCount > 0) &&
                        <Box display="flex" alignItems="center">
                            <Error fontSize="small" color="error"/>
                            <Typography component="span" variant="subtitle1" color="error">
                                <FormattedMessage id="project.users.Logout.noEmptyCart"/>
                            </Typography>
                        </Box>}
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="secondary" disableElevation onClick={closeDialog}>
                        <FormattedMessage id="project.global.button.cancel"/>
                    </Button>
                    <Button variant="contained" color="primary" autoFocus disableElevation onClick={logout}>
                        <FormattedMessage id="project.global.button.continue"/>
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default LogOut;
