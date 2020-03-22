import React, {Fragment} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Chip,
    Divider,
    Grid,
    Hidden,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from '@material-ui/core';
import {FormattedMessage} from 'react-intl';
import {Block, Edit, NavigateBefore, NavigateNext} from '@material-ui/icons';

import useStyles from '../styles/UserList';

import * as actions from '../actions';
import * as selectors from '../selectors';
import Role from '../constants/Role';

const RoleList = ({userRoles, justify = 'center'}) => {

    const classes = useStyles();

    const roles = useSelector(selectors.getRoles);
    const getRole = id => selectors.getRoleName(roles, id);

    return (
        <Grid container spacing={1} justify={justify}>
            {userRoles.map(r => {

                const role = getRole(r);
                const message = `project.global.field.roles.${role !== '' ? role : '?'}`;

                let chipClasses;

                switch (role) {
                    case Role.ADMIN:
                        chipClasses = classes.adminChip;
                        break;
                    case Role.MANAGER:
                        chipClasses = classes.managerChip;
                        break;
                    case Role.SALESMAN:
                        chipClasses = classes.salesmanChip;
                        break;
                    default:
                        chipClasses = classes.undefinedChip;
                        break;
                }

                return (
                    <Grid key={r} item>
                        <Chip className={chipClasses} size="small" label={<FormattedMessage id={message}/>}/>
                    </Grid>
                );
            })}
        </Grid>
    );

};

const UserList = ({users, page, startSearch, stopSearch}) => {

    const classes = useStyles();

    const dispatch = useDispatch();

    const handlePrevious = () => {
        startSearch();
        dispatch(actions.previousUsersPage(page, stopSearch));
    };

    const handleNext = () => {
        startSearch();
        dispatch(actions.nextUsersPage(page, stopSearch));
    };

    return (
        <Fragment>
            <Hidden xsDown>
                <Paper>
                    <Table size="small" >
                        <TableHead>
                            <TableRow>
                                <TableCell align="left"><FormattedMessage id="project.global.field.username"/></TableCell>
                                <TableCell align="left"><FormattedMessage id="project.global.field.name"/></TableCell>
                                <TableCell align="center"><FormattedMessage id="project.global.field.roles"/></TableCell>
                                <TableCell align="center"><FormattedMessage id="project.global.field.actions"/></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.items.map(user => (
                                <TableRow key={user.id}>
                                    <TableCell align="left">{user.userName}</TableCell>
                                    <TableCell align="left">{user.name} {user.surnames}</TableCell>
                                    <TableCell align="center">
                                        <RoleList userRoles={user.roles}/>
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton size="small" onClick={null/*editUser(user.id)*/}>
                                            <Edit/>
                                        </IconButton>
                                        <IconButton size="small" onClick={null/*blockUser(user.id)*/}>
                                            <Block/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Box display="flex" justifyContent="flex-end">
                        <IconButton size="medium" disabled={page === 0} onClick={handlePrevious}>
                            <NavigateBefore/>
                        </IconButton>
                        <IconButton size="medium" disabled={!users.existMoreItems} onClick={handleNext}>
                            <NavigateNext/>
                        </IconButton>
                    </Box>
                </Paper>
            </Hidden>
            <Hidden smUp>
                {users.items.map(user => (
                    <Card key={user.id} className={classes.card}>
                        <CardHeader className={classes.header}
                                    title={<Box color="black">{user.name} {user.surnames}</Box>}
                                    subheader={<Box fontStyle="italic">{user.userName}</Box>}
                                    action={<Box>
                                        <IconButton onClick={null/*editUser(user.id)*/}><Edit/></IconButton>
                                        <IconButton onClick={null/*blockUser(user.id)*/}><Block/></IconButton>
                                    </Box>}/>
                        <Divider/>
                        <CardContent className={classes.content}>
                            <RoleList userRoles={user.roles} justify="flex-start"/>
                        </CardContent>
                    </Card>
                ))}
                <Box display="flex" justifyContent="flex-end">
                    <IconButton size="medium" disabled={page === 0} onClick={handlePrevious}>
                        <NavigateBefore/>
                    </IconButton>
                    <IconButton size="medium" disabled={!users.existMoreItems} onClick={handleNext}>
                        <NavigateNext/>
                    </IconButton>
                </Box>
            </Hidden>
        </Fragment>
    );

};

export default UserList;
