import React, {Suspense, useState} from 'react';
import {useSelector} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {LinearProgress} from '@material-ui/core';

import useStyles from '../styles/Main';

import TopBar from './TopBar';
import SideBar from './SideBar';
import Dashboard from './Dashboard';
import users, {Role} from '../../users';

/*const CategoriesPage = React.lazy(() => {
    return new Promise(resolve => {
        setTimeout(() => resolve(import('../../catalog/components/CategoriesPage')), 5000);
    });
});*/
const CategoriesPage = React.lazy(() => import('../../catalog/components/CategoriesPage'));
const ProductsPage = React.lazy(() => import('../../catalog/components/ProductsPage'));

const Main = () => {
    const classes = useStyles();

    const user = useSelector(users.selectors.getUser);

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
                                    <Route exact path="/" component={Dashboard}/>
                                    <Route exact path="/catalog/categories" component={CategoriesPage}/>
                                    <Route exact path="/catalog/products" component={ProductsPage}/>
                                    { users.selectors.hasRole(user, [Role.MANAGER])
                                        && <Route exact path="/staff/users" component={Dashboard}/> }
                                    <Route component={Dashboard}/>
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
