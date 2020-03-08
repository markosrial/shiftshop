import React from 'react';
import {useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import {List} from '@material-ui/core';

import useStyles from '../styles/Navigation'

import users from '../../users';
import NavigationRoutes from '../constants/NavigationRoutes';
import NavigationCollapse from './NavigationCollapse';
import NavigationItem from './NavigationItem';


const Navigation = () => {
    const classes = useStyles();
    const {pathname} = useLocation();

    const user = useSelector(users.selectors.getUser);

    const checkActive = route => (pathname === route || pathname.startsWith(route + "/"));
    const checkPermissions = roles => users.selectors.hasRole(user, roles);

    return (
        NavigationRoutes.map(({title, items, permissions}) => (
            checkPermissions(permissions) &&
            <div key={title} className={classes.root}>
                {title &&
                <div className={classes.navTitle}>
                    <FormattedMessage id={title}/>
                </div>}
                <List>
                    {items.map(({title, route, icon=null, children=null}) =>
                        children
                            ? <NavigationCollapse key={title} title={title} route={route} icon={icon} children={children}
                                                  checkActive={checkActive} checkPermissions={checkPermissions}/>
                            : <NavigationItem key={title} title={title} route={route} icon={icon} checkActive={checkActive}/>
                    )}
                </List>
            </div>
        ))
    );
};

export default Navigation;
