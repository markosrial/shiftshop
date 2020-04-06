import React, {useEffect, useState} from 'react';
import {Box, Button, CircularProgress, Typography} from '@material-ui/core';
import {FormattedMessage} from 'react-intl';
import {Error} from '@material-ui/icons';

import {useStyles} from '../styles/ServiceSync';

import {ErrorsDB, ProductsDB, UsersDB} from '../../../databases';

import * as actions from '../actions';
import {minDelayFunction} from '../../utils';

const ServiceSync = ({localUpdateTimestamp, lastUpdateTimestamp, nextStep, onCancel}) => {

    const classes = useStyles();

    const [updating, setUpdating] = useState(false);
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        update();
    }, []);

    const update = async () => {

        if (updating) return;

        setUpdating(true);

        try {

            const delay = minDelayFunction(1000);

            await actions.syncUsers(localUpdateTimestamp, users => addUsers(users));
            await actions.syncProducts(localUpdateTimestamp, products => addProducts(products));

            actions.setLocalStorageUpdateTimestamp(lastUpdateTimestamp);
            delay(nextStep);

        } catch (e) {

            setUpdating(false);
            setFailed(true);

        }


    };

    const sleep = (delay) => {
        return new Promise(resolve => {
            setTimeout(resolve, delay)
        });
    }

    const addUsers = async (users) => {

        if (users.length === 0) {
            return;
        }

        let usersDB = await UsersDB.init();

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

        }
        // With existing data -> update items
        else {

            // Add + update all salesman users && remove no salesman users
            await Promise.all(
                users.map(async user => await updateDBUser(usersDB, user))
            );

        }

        usersDB.close();

    };

    const updateDBUser = async (usersDB, user) => {

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

    const addProducts = async (products) => {

        if (products.length === 0) {
            return;
        }

        let productsDB = await ProductsDB.init();

        // With no data -> add all items on fresh DB
        if (!localUpdateTimestamp) {

            // Empty DB
            await productsDB.destroy();
            productsDB = await ProductsDB.init();

            // Add all active products
            await Promise.all(
                products.map(async (product) => {
                    const {id, name, salePrice, barcode} = product;
                    await productsDB.add({_id: id.toString(), id, name, salePrice, barcode});
                })
            );

        }
        // With existing data -> update items
        else {

            // Add + update all products && remove no active products
            await Promise.all(
                products.map(async product => await updateDBProduct(productsDB, product))
            );

        }

        productsDB.close();

    };

    const updateDBProduct = async (productsDB, product) => {

        const data = {
            id: product.id,
            name: product.name,
            salePrice: product.salePrice,
            barcode: product.barcode
        };

        if (!product.active) {
            try {
                await productsDB.remove(data.id.toString());
            } catch (e) {
                // If not added on previous updates then continue
                if (e === ErrorsDB.NotFound) return;
            }
        } else {

            try {
                await productsDB.getById(data.id.toString());
            } catch (e) {
                if (e === ErrorsDB.NotFound) {
                    // NotFound -> add
                    await productsDB.add({_id: data.id.toString(), ...data});
                    return;
                }
            }

            // Found -> update
            await productsDB.update(data.id.toString(), data);

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
