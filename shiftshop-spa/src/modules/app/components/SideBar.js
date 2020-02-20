import React, {Fragment, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Drawer, Hidden, Paper} from '@material-ui/core';

import useStyles from '../styles/SideBar';

import Navigation from './Navigation';

const SideBar = ({sidebarActive, closeSidebar}) => {
    const classes = useStyles();
    const {pathname} = useLocation();

    useEffect(() => {
        if (sidebarActive) {
            closeSidebar();
        }
        // eslint-disable-next-line
    }, [pathname]);

    const content = (
        <div className={classes.content}>
            <nav className={classes.navigation}>
                <Navigation/>
            </nav>
        </div>
    );

    return (
        <Fragment>
            <Hidden mdUp>
                <Drawer className={classes.root} variant="temporary" anchor="left" open={sidebarActive} onClose={closeSidebar}
                        ModalProps={{ keepMounted: true }}>
                    {content}
                </Drawer>
            </Hidden>
            <Hidden smDown>
                <Paper className={classes.root} elevation={1} square>
                    {content}
                </Paper>
            </Hidden>
        </Fragment>
    );
};

SideBar.propTypes = {
    sidebarActive: PropTypes.bool.isRequired,
    closeSidebar: PropTypes.func.isRequired
};

export default SideBar;
