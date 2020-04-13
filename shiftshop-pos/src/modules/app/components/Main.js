import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useSnackbar} from 'notistack';
import {HashRouter, Route, Switch} from 'react-router-dom';
import {Button} from '@material-ui/core';

import useStyles from '../styles/Main';

import records from '../../records';
import sales, {ShoppingFrame} from '../../sales';
import TopBar from './TopBar';
import SideBar from './SideBar';
import {FormattedMessage} from 'react-intl';

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
        dispatch(records.actions.instantiateSalesDB());

        return () => dispatch(records.actions.closeSalesDB());

    }, []);

    const [sidebarActive, setSidebarActive] = useState(true);

    const handleSidebarOpen = () => setSidebarActive(true);
    const handleSidebarClose = () => setSidebarActive(false);

    return (
        <div className={classes.root}>
            <HashRouter>
                <TopBar className={classes.topBar} openSidebar={handleSidebarOpen}/>
                <div className={classes.container}>
                    <SideBar className={classes.sideBar} sidebarActive={sidebarActive} closeSidebar={handleSidebarClose}/>
                    <div className={classes.content}>
                        <Switch>
                            <Route exact path="/"><ShoppingFrame/></Route>
                            <Route exact path="/shopping"><ShoppingFrame/></Route>
                            <Route><ShoppingFrame/></Route>
                        </Switch>
                    </div>
                </div>
            </HashRouter>
        </div>
    );
};

export default Main;
