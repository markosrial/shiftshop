import React, {Suspense, useState} from 'react';
import {useSelector} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {LinearProgress} from '@material-ui/core';

import useStyles from '../styles/Main';

import users, {Role} from '../../users';
import TopBar from './TopBar';
import SideBar from './SideBar';
import Dashboard from './Dashboard';

const CategoriesPage = React.lazy(() => import('../../catalog/components/CategoriesPage'));
const ProductsPage = React.lazy(() => import('../../catalog/components/ProductsPage'));
const ProductPage = React.lazy(() => import('../../catalog/components/ProductPage'));
const SalesPage = React.lazy(() => import('../../sales/components/SalesPage'));
const UsersPage = React.lazy(() => import('../../users/components/UsersPage'));

const Main = () => {
    const classes = useStyles();

    const user = useSelector(users.selectors.getUser);
    const hasRole = roles => users.selectors.hasRole(user, roles);

    const [sidebarActive, setSidebarActive] = useState(false);

    const handleSidebarOpen = () => setSidebarActive(true);
    const handleSidebarClose = () => setSidebarActive(false);

    return (
        <div className={classes.root}>
            <BrowserRouter>
                <TopBar className={classes.topBar} openSidebar={handleSidebarOpen}/>
                <div className={classes.container}>
                    <SideBar className={classes.sideBar} sidebarActive={sidebarActive} closeSidebar={handleSidebarClose}/>
                    <div className={classes.content}>
                        <Suspense fallback={<LinearProgress className={classes.loading} color="secondary"/>}>
                            <div className={classes.innerContent}>
                                <Switch>
                                    <Route exact path="/"><Dashboard/></Route>
                                    <Route exact path="/dashboard"><Dashboard/></Route>
                                    <Route exact path="/catalog/categories"><CategoriesPage/></Route>
                                    <Route exact path="/catalog/products"><ProductsPage/></Route>
                                    <Route exact path="/catalog/products/:id"><ProductPage/></Route>
                                    <Route exact path="/sales/records"><SalesPage/></Route>
                                    { hasRole([Role.MANAGER])
                                        && <Route exact path="/staff/users"><UsersPage/></Route> }
                                    <Route><Dashboard/></Route>
                                </Switch>
                            </div>
                        </Suspense>
                    </div>
                </div>
            </BrowserRouter>
        </div>
    );
};


export default Main;
