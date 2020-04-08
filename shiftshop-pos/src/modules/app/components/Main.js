import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {HashRouter, Route, Switch} from 'react-router-dom';

import useStyles from '../styles/Main';

import users from '../../users';
import shopping, {ShoppingFrame} from '../../sales';
import TopBar from './TopBar';
import SideBar from './SideBar';

const Main = () => {

    const classes = useStyles();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(shopping.actions.loadCatalog(error => console.log(error)));
    }, []);

    const user = useSelector(users.selectors.getUser);

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
