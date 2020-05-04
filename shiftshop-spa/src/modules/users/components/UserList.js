import React, {Fragment} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useSnackbar} from 'notistack';
import {
    Badge,
    Box,
    Button,
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
import {Edit, Lock, LockOpen, NavigateBefore, NavigateNext} from '@material-ui/icons';

import useStyles from '../styles/UserList';

import * as actions from '../actions';
import * as selectors from '../selectors';
import Role from '../constants/Role';
import {ErrorContent} from '../../common';

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

const UserList = ({users, criteria, editUser, startSearch, stopSearch}) => {

    const classes = useStyles();

    const {enqueueSnackbar, closeSnackbar} = useSnackbar();

    const dispatch = useDispatch();

    const refreshPage = () => {
        startSearch();
        dispatch(actions.getUsers(criteria, stopSearch));
    }

    const handlePrevious = () => {
        startSearch();
        dispatch(actions.previousUsersPage(criteria, stopSearch));
    };

    const handleNext = () => {
        startSearch();
        dispatch(actions.nextUsersPage(criteria, stopSearch));
    };

    const blockUser = id => {
        actions.blockUser(id, refreshPage,
            errors => {
                enqueueSnackbar(<ErrorContent errors={errors}/>,
                    {
                        variant: 'error',
                        persist: 'true',
                        action: key => (<Button color="inherit" variant="outlined" onClick={() => closeSnackbar(key)}>
                            <FormattedMessage id="project.global.button.close"/>
                        </Button>)
                    });
            });
    }

    const unblockUser = id => {
        actions.unblockUser(id, refreshPage,
            errors => {
                enqueueSnackbar(<ErrorContent errors={errors}/>,
                    {
                        variant: 'error',
                        persist: 'true',
                        action: key => (<Button color="inherit" variant="outlined" onClick={() => closeSnackbar(key)}>
                            <FormattedMessage id="project.global.button.close"/>
                        </Button>)
                    });
            });
    }

    return (
        <Fragment>
            <Hidden xsDown>
                <Paper>
                    <Table size="small" >
                        <TableHead>
                            <TableRow>
                                <TableCell align="left"><FormattedMessage id="project.global.field.username"/></TableCell>
                                <TableCell align="left"><FormattedMessage id="project.global.field.name"/></TableCell>
                                <TableCell align="center"><FormattedMessage id="project.global.field.state"/></TableCell>
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
                                        <Badge color={user.active ? "primary" : "error"} variant="dot"></Badge>
                                    </TableCell>
                                    <TableCell align="center">
                                        <RoleList userRoles={user.roles}/>
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton size="small" onClick={() => editUser(user)}>
                                            <Edit/>
                                        </IconButton>
                                        {user.active
                                            ? <IconButton size="small" onClick={() => blockUser(user.id)}><Lock/></IconButton>
                                            : <IconButton size="small" onClick={() => unblockUser(user.id)}><LockOpen/></IconButton>}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Box display="flex" justifyContent="flex-end">
                        <IconButton size="medium" disabled={criteria.page === 0} onClick={handlePrevious}>
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
                                    subheader={<Box display="flex" alignItems="center">
                                        <Box mr={1} fontStyle="italic">{user.userName}</Box>
                                        <Badge color={user.active ? "primary" : "error"} variant="dot"></Badge>
                                    </Box>}
                                    action={<Box>
                                        <IconButton onClick={() => editUser(user)}><Edit/></IconButton>
                                        {user.active
                                            ? <IconButton onClick={() => blockUser(user.id)}><Lock/></IconButton>
                                            : <IconButton onClick={() => unblockUser(user.id)}><LockOpen/></IconButton>}
                                    </Box>}/>
                        <Divider/>
                        <CardContent className={classes.content}>
                            <RoleList userRoles={user.roles} justify="flex-start"/>
                        </CardContent>
                    </Card>
                ))}
                <Box display="flex" justifyContent="flex-end">
                    <IconButton size="medium" disabled={criteria.page === 0} onClick={handlePrevious}>
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
