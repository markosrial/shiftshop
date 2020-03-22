import React, {Fragment} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {Box, Button, LinearProgress, Typography} from '@material-ui/core';

import {emptyUsers, notFound, searchPeople} from '../../../assets/images';
import useStyles from '../styles/BlockedUsersSearchResult';

import * as actions from '../actions';
import * as selectors from '../selectors';
import BlockedUserList from './BlockedUserList';

const BlockedUsersSearchResult = ({searching, startSearch, stopSearch}) => {

    const classes = useStyles();

    const dispatch = useDispatch();
    const usersSearch = useSelector(selectors.getBlockedUsersSearch);

    const loadPage = page => {

        if (searching) return;

        startSearch();

        dispatch(actions.getBlockedUsers(page, stopSearch));

    };

    if (searching) {
        return (
            <Fragment>
                <LinearProgress/>
                <div className={classes.emptyPlaceholder}>
                    <Box className={classes.imageBox}>
                        <img className={classes.image} src={searchPeople} alt="No users"/>
                    </Box>
                    <Typography className={classes.emptyText} variant="body1">
                        <FormattedMessage id="project.users.BlockedUsersSearchResult.searchingUsers"/>
                    </Typography>
                </div>
            </Fragment>
        );
    }

    if (!usersSearch) {
        return (
            <div className={classes.emptyPlaceholder}>
                <Box className={classes.imageBox}>
                    <img className={classes.image} src={notFound} alt="No data"/>
                </Box>
                <Typography className={classes.emptyText} variant="body1">
                    <FormattedMessage id="project.users.BlockedUsersSearchResult.noData"/>
                </Typography>
            </div>
        );
    }

    if (usersSearch.result.items.length === 0) {
        return (
            <div className={classes.emptyPlaceholder}>
                <Box className={classes.imageBox}>
                    <img className={classes.image} src={emptyUsers} alt="No users"/>
                </Box>
                <Typography className={classes.emptyText} variant="body1">
                    <FormattedMessage id="project.users.BlockedUsersSearchResult.emptyUsers"/>
                </Typography>
                {usersSearch.page > 0 &&
                <Button className={classes.backButton} variant="outlined"
                        onClick={() => loadPage(usersSearch.page-1)}>
                    <FormattedMessage id="project.users.UsersSearchResult.backButton"/>
                </Button>}
            </div>
        );
    }

    return (
        <BlockedUserList users={usersSearch.result} page={usersSearch.page}
                         searching={searching}
                         startSearch={startSearch} stopSearch={stopSearch}/>
    );

};

export default BlockedUsersSearchResult;
