import React, {Fragment, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {Box, Card, CardContent, CardHeader, Divider, IconButton} from '@material-ui/core';
import {Loop, Visibility, VisibilityOff} from '@material-ui/icons';

import * as actions from '../actions';
import * as selectors from '../selectors';
import UsersSearchResult from './UsersSearchResult';
import EditUser from './EditUser';

const UsersSearch = () => {

    const dispatch = useDispatch();
    const usersSearch = useSelector(selectors.getUsersSearch);

    const [onlyActive, setOnlyActive] = useState(true);
    const [editUser, setEditUser] = useState(null);
    const [searching, setSearching] = useState(true);

    const _isMounted = useRef(true);

    useEffect(() => {

        dispatch(actions.getUsers({onlyActive, page: 0}, stopSearch));

        return () => _isMounted.current = false;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const openEditUser = user => setEditUser(user);

    const startSearch = () => _isMounted.current && setSearching(true);
    const stopSearch = () => _isMounted.current && setSearching(false);

    const refreshPage = () => {

        if (!searching && usersSearch && usersSearch.criteria != null) {
            startSearch();
            dispatch(actions.getUsers(usersSearch.criteria, stopSearch));
        }

    };

    const changeCriteria = showOnlyActive => {

        if (searching) {
            return;
        }

        startSearch();
        setOnlyActive(showOnlyActive);

        dispatch(actions.getUsers({onlyActive: showOnlyActive, page: 0}, stopSearch));

    }

    return (
        <Fragment>
            <Card>
                <CardHeader title={<FormattedMessage id="project.users.UsersSearch.title"/>}
                            action={<Box>
                                <IconButton onClick={refreshPage} disabled={searching}><Loop/></IconButton>
                                <IconButton onClick={() => changeCriteria(!onlyActive)} disabled={searching}>
                                    {onlyActive ? <Visibility/> : <VisibilityOff/>}
                                </IconButton>
                            </Box>}/>
                <Divider/>
                <CardContent>
                    <UsersSearchResult editUser={openEditUser} searching={searching}
                                       startSearch={startSearch} stopSearch={stopSearch}/>
                </CardContent>
            </Card>
            {editUser && <EditUser user={editUser} onEdit={refreshPage}
                                   onClose={() => setEditUser(null)}/>}
        </Fragment>
    );

};

export default UsersSearch;
