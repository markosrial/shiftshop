import React, {Fragment} from 'react';
import {useDispatch} from 'react-redux';
import {Box, Button, Divider, IconButton, List, ListItem, ListItemText} from '@material-ui/core';
import {LockOpen, NavigateBefore, NavigateNext} from '@material-ui/icons';

import useStyles from '../styles/BlockedUserList';

import * as actions from '../actions';

const BlockedUserList = ({users, page, searching, startSearch, stopSearch}) => {

    const classes = useStyles();

    const dispatch = useDispatch();

    const handlePrevious = () => {
        startSearch();
        dispatch(actions.previousBlockedUsersPage(page, stopSearch));
    };

    const handleNext = () => {
        startSearch();
        dispatch(actions.nextBlockedUsersPage(page, stopSearch));
    };

    return (
        <Fragment>
            <List className={classes.list}>
                {users.items.map(user => (
                    <Fragment key={user.id}>
                        <Divider/>
                        <ListItem className={classes.listItem}>
                            <ListItemText>{user.name} {user.surnames}</ListItemText>
                            <IconButton onClick={null/*activeUser(user.id)*/}>
                                <LockOpen/>
                            </IconButton>
                        </ListItem>
                    </Fragment>
                ))}
            </List>
            <Box display="flex">
                <Button disabled={page === 0} onClick={handlePrevious} fullWidth><NavigateBefore/></Button>
                <Button disabled={!users.existMoreItems} onClick={handleNext} fullWidth><NavigateNext/></Button>
            </Box>
        </Fragment>
    );


};

export default BlockedUserList;
