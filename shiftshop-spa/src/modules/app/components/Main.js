import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import useStyles from '../styles/Main';

import TopBar from './TopBar';
import SideBar from './SideBar';
import Dashboard from './Dashboard';
import users, {Role} from '../../users';

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
                        <Switch>
                            <Route exact path="/" component={Dashboard}/>
                            { users.selectors.hasRole(user, [Role.MANAGER])
                                && <Route exact path="/staff/users" component={Dashboard}/> }
                            <Route component={Dashboard}/>
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        </div>
    );
};


export default Main;
