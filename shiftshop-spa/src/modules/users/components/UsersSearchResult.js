import React, {Fragment} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {Box, Button, LinearProgress, Typography} from '@material-ui/core';

import {emptyUsers, notFound} from '../../../assets/images';
import useStyles from '../styles/UsersSearchResult';

import * as actions from '../actions';
import * as selectors from '../selectors';
import UserList from './UserList';

const UsersSearchResult = ({searching, startSearch, stopSearch}) => {

    const classes = useStyles();

    const dispatch = useDispatch();
    const usersSearch = useSelector(selectors.getUsersSearch);

    const loadPage = page => {

        if (searching) return;

        startSearch();

        dispatch(actions.getUsers(page, stopSearch));

    };

    if (searching) {
        return (<LinearProgress/>);
    }

    if (!usersSearch) {
        return (
            <div className={classes.emptyPlaceholder}>
                <Box className={classes.imageBox}>
                    <img className={classes.image} src={notFound} alt="No data"/>
                </Box>
                <Typography className={classes.emptyText} variant="body1">
                    <FormattedMessage id="project.users.UsersSearchResult.noData"/>
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
                    <FormattedMessage id="project.users.UsersSearchResult.emptyUsers"/>
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
        <Fragment>
            <UserList users={usersSearch.result} page={usersSearch.page} startSearch={startSearch} stopSearch={stopSearch}/>
        </Fragment>
    );

};

export default UsersSearchResult;
