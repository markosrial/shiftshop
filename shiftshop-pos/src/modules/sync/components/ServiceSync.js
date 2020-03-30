import React, {useEffect, useState} from 'react';
import {Box, Button, CircularProgress, Typography} from '@material-ui/core';
import {FormattedMessage} from 'react-intl';
import {Error} from '@material-ui/icons';

import {useStyles} from '../styles/ServiceSync';

import {ErrorsDB, UsersDB} from '../../../databases';

import * as actions from '../actions';
import {minDelayFunction} from '../../utils';

const ServiceSync = ({localUpdateTimestamp, lastUpdateTimestamp, nextStep, onCancel}) => {

    const classes = useStyles();

    const [updating, setUpdating] = useState(false);
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        update();
    }, []);

    const update = () => {

        if (updating) return;

        setUpdating(true);

        actions.syncUsers(localUpdateTimestamp, users => addUsers(users));

    };

    const addUsers = async (users) => {

        try {

            let usersDB = await UsersDB.init();

            const delay = minDelayFunction(1000);

            // With no data -> add all items on fresh DB
            if (!localUpdateTimestamp) {

                // Empty DB
                await usersDB.destroy();
                usersDB = await UsersDB.init();

                // Add all salesman users
                await Promise.all(
                    users.map(async (user) => {
                        const {id, userName, password, name} = user;
                        await usersDB.add({_id: userName, id, userName, password, name});
                    })
                );

                actions.setLocalStorageUpdateTimestamp(lastUpdateTimestamp);
                delay(nextStep);
            }
            // With existing data -> update items
            else {

                // Add + update all salesman users && remove no salesman users
                await Promise.all(
                    users.map(async user => await updateDBUser(usersDB, user))
                );

                actions.setLocalStorageUpdateTimestamp(lastUpdateTimestamp);
                delay(nextStep);
            }

        } catch (e) {
            setUpdating(false);
            setFailed(true);
        }
    };

    const updateDBUser = async (usersDB, user) => {

        console.log(user);

        const data = {
            id: user.id,
            userName: user.userName,
            password: user.password,
            name: user.name
        };

        if (!user.salesman || !user.active) {
            try {
                await usersDB.remove(data.userName);
            } catch (e) {
                // If not added on previous updates then continue
                if (e === ErrorsDB.NotFound) return;
            }
        } else {

            try {
                await usersDB.getById(data.userName);
            } catch (e) {
                if (e === ErrorsDB.NotFound) {
                    // NotFound -> add
                    await usersDB.add({_id: data.userName, ...data});
                    return;
                }
            }

            // Found -> update
            await usersDB.update(data.userName, data);

        }

    };

    if (updating) {

        return (
            <Box p={1}>
                <Box display="flex" alignItems="center"><CircularProgress size={24}/>
                &nbsp;<FormattedMessage id="project.sync.ServiceSync.updating"/>...</Box>
            </Box>
        );

    }

    if (failed) {
        return (
            <Box pt={1}>
                <Box pb={1}>
                    <Typography className={classes.errorMessage} variant="subtitle2" color="error">
                        <Error className={classes.errorIcon}/>
                        <FormattedMessage id="project.sync.ServiceSync.errorUpdating"/>
                    </Typography>
                </Box>
                <Button color="secondary" variant="contained" size="small" disableElevation
                        onClick={onCancel}>
                    <FormattedMessage id="project.global.button.cancel"/>
                </Button>
                &nbsp;
                <Button color="primary" variant="contained" size="small" disableElevation
                        onClick={update}>
                    <FormattedMessage id="project.global.button.retry"/>
                </Button>
            </Box>
        );
    }

    return (
        <Button color="primary" variant="contained" size="small" disableElevation
                onClick={nextStep}>
            Continue
        </Button>
    );

};

export default ServiceSync;
