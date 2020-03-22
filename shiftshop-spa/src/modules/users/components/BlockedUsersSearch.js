import React, {Fragment, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Typography} from '@material-ui/core';
import {Lock} from '@material-ui/icons'

import useStyles from '../styles/BlockedUsersSearch';

import * as actions from '../actions';
import * as selectors from '../selectors';
import BlockedUsersSearchResult from './BlockedUsersSearchResult';

const BlockedUsersSearch = () => {

    const classes = useStyles();

    const dispatch = useDispatch();
    const blockedUsersSearch = useSelector(selectors.getBlockedUsersSearch);

    const [open, setOpen] = useState(false);
    const [searching, setSearching] = useState(false);

    const _isMounted = useRef(true);

    useEffect(() => {
        return () => _isMounted.current = false;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {

        if (open && !searching) {
            startSearch();
            dispatch(actions.getBlockedUsers(0, stopSearch));
        }

        return () => open && dispatch(actions.clearBlockedUsersSearch());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    const startSearch = () => _isMounted.current && setSearching(true);
    const stopSearch = () => _isMounted.current && setSearching(false);

    const refreshPage = () => {

        if (!searching && blockedUsersSearch && blockedUsersSearch.page != null) {
            startSearch();
            dispatch(actions.getBlockedUsers(blockedUsersSearch.page, stopSearch));
        }

    };

    return (
        <Fragment>
            <Button variant="outlined" color="secondary" onClick={() => setOpen(true)}>
                <Lock/>
            </Button>
            <Dialog open={open} fullWidth onClose={() => setOpen(false)}>
                <DialogTitle>
                    <Typography component="span" variant="h5">
                        <FormattedMessage id="project.users.BlockedUsersSearch.title"/>
                    </Typography>
                </DialogTitle>
                <Divider/>
                <DialogContent className={classes.content}>
                    {open && <BlockedUsersSearchResult searching={searching} startSearch={startSearch} stopSearch={stopSearch}/>}
                </DialogContent>
                <Divider/>
                <DialogActions>
                    <Button variant="contained" color="secondary" size="small" disableElevation
                            onClick={() => setOpen(false)}>
                        <FormattedMessage id="project.global.button.close"/>
                    </Button>
                    <Button variant="contained" color="primary" size="small" disableElevation
                            onClick={refreshPage} disabled={searching}>
                        <FormattedMessage id="project.global.button.refresh"/>
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );

};

export default BlockedUsersSearch;
