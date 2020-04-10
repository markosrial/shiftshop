import React, {Fragment, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography
} from '@material-ui/core';
import {ClearAll, Close, Error} from '@material-ui/icons';

import useStyles from '../styles/CleanCart';

import * as actions from '../actions';
import * as selectors from '../selectors';

const CleanCart = () => {

    const classes = useStyles();

    const dispatch = useDispatch();
    const cartCount = useSelector(selectors.getShoppingCartCount);

    const [open, setOpen] = useState(false);

    const openDialog = () => setOpen(true);
    const closeDialog = () => setOpen(false);

    const cleanCart = () => {
        dispatch(actions.clearCart());
        closeDialog();
    };

    return (
        <Fragment>
            <Button variant="contained" color="secondary" size="small" disableElevation
                    disabled={cartCount === 0} onClick={openDialog}>
                <ClearAll fontSize="small"/>
                &nbsp;
                <FormattedMessage id="project.global.button.clear"/>
            </Button>
            <Dialog className={classes.root} fullWidth maxWidth="xs" scroll="body"
                    open={open} onClose={closeDialog}>
                <DialogTitle>
                    <Typography component="span" variant="h4">
                        <FormattedMessage id="project.sales.CleanCart.title"/>
                    </Typography>
                    <IconButton className={classes.closeButton} onClick={closeDialog}>
                        <Close/>
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <Typography component="span" variant="subtitle1">
                        <FormattedMessage id="project.sales.CleanCart.message"/>
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="secondary" disableElevation onClick={closeDialog}>
                        <FormattedMessage id="project.global.button.cancel"/>
                    </Button>
                    <Button variant="contained" color="primary" autoFocus disableElevation onClick={cleanCart}>
                        <FormattedMessage id="project.global.button.continue"/>
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );

};

export default CleanCart;
