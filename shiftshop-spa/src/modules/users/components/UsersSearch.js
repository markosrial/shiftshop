import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {Box, Card, CardActions, CardContent, CardHeader, Divider, IconButton} from '@material-ui/core';
import {Loop} from '@material-ui/icons';

import * as actions from '../actions';
import * as selectors from '../selectors';
import UsersSearchResult from './UsersSearchResult';
import BlockedUsersSearch from './BlockedUsersSearch';

const UsersSearch = () => {

    const dispatch = useDispatch();
    const usersSearch = useSelector(selectors.getUsersSearch);

    const [searching, setSearching] = useState(true);

    const _isMounted = useRef(true);

    useEffect(() => {

        dispatch(actions.getUsers(0, stopSearch));

        return () => _isMounted.current = false;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const startSearch = () => _isMounted.current && setSearching(true);
    const stopSearch = () => _isMounted.current && setSearching(false);

    const refreshPage = () => {

        if (!searching && usersSearch && usersSearch.page != null) {
            startSearch();
            dispatch(actions.getUsers(usersSearch.page, stopSearch));
        }

    };

    return (
        <Card>
            <CardHeader title={<FormattedMessage id="project.users.UsersSearch.title"/>}
                        action={<IconButton onClick={refreshPage} disabled={searching}><Loop/></IconButton>}/>
            <Divider/>
            <CardContent>
                <UsersSearchResult searching={searching} startSearch={startSearch} stopSearch={stopSearch}/>
            </CardContent>
            <Divider/>
            <CardActions>
                <Box display="flex" flexGrow={1} justifyContent="flex-end"><BlockedUsersSearch/></Box>
            </CardActions>
        </Card>
    );

};

export default UsersSearch;
