import React, {Fragment, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {useSnackbar} from 'notistack';
import {HashRouter, Route, Switch} from 'react-router-dom';
import {Button} from '@material-ui/core';

import useStyles from '../styles/Main';

import records, {RecordsFrame} from '../../records';
import sales, {ShoppingFrame} from '../../sales';
import {PrinterConfigFrame, PrinterLibLoader} from '../../printer';
import TopBar from './TopBar';
import SideBar from './SideBar';

const Main = () => {

    const classes = useStyles();

    const {enqueueSnackbar, closeSnackbar} = useSnackbar();

    const dispatch = useDispatch();

    useEffect(() => {

        // Init
        dispatch(sales.actions.loadCatalog(
            () => enqueueSnackbar(
                <FormattedMessage id="project.app.Main.loadCatalogError"/>,
                {variant: 'error', persist: true, action: key => (
                    <Button variant="outlined" color="inherit" onClick={() => closeSnackbar(key)}>
                        <FormattedMessage id="project.global.button.close"/>
                    </Button>)})
        ));
        dispatch(records.actions.instantiateSalesDB(
            () => enqueueSnackbar(
                <FormattedMessage id="project.app.Main.loadSalesDBError"/>,
                {variant: 'error', persist: true, action: key => (
                        <Button variant="outlined" color="inherit" onClick={() => closeSnackbar(key)}>
                            <FormattedMessage id="project.global.button.close"/>
                        </Button>)})
        ));

        return () => dispatch(records.actions.closeSalesDB());

    }, []);

    return (
        <Fragment>
            <div className={classes.root}>
                <HashRouter basename="/">
                    <TopBar className={classes.topBar}/>
                    <div className={classes.container}>
                        <SideBar className={classes.sideBar}/>
                        <div className={classes.content}>
                            <Switch>
                                <Route exact path="/"><ShoppingFrame/></Route>
                                <Route exact path="/shopping/cart"><ShoppingFrame/></Route>
                                <Route exact path="/records/sales"><RecordsFrame/></Route>
                                <Route exact path="/records/preOrders"><div/></Route>
                                <Route exact path="/config/printer"><PrinterConfigFrame/></Route>
                                <Route><ShoppingFrame/></Route>
                            </Switch>
                        </div>
                    </div>
                </HashRouter>
            </div>
            <PrinterLibLoader/>
        </Fragment>
    );
};

export default Main;
