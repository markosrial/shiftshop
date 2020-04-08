import React from 'react';
import {useLocation} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import {List} from '@material-ui/core';

import useStyles from '../styles/Navigation'

import NavigationRoutes from '../constants/NavigationRoutes';
import NavigationCollapse from './NavigationCollapse';
import NavigationItem from './NavigationItem';

const Navigation = () => {

    const classes = useStyles();

    const {pathname} = useLocation();

    const checkActive = route => (pathname === route || pathname.startsWith(route + "/"));

    return (
        NavigationRoutes.map(({title, items}) => (
            <div key={title} className={classes.root}>
                {title &&
                <div className={classes.navTitle}>
                    <FormattedMessage id={title}/>
                </div>}
                <List>
                    {items.map(({title, route, icon=null, children=null}) =>
                        children
                            ? <NavigationCollapse key={title} title={title} route={route} icon={icon}
                                                  children={children} checkActive={checkActive}/>
                            : <NavigationItem key={title} title={title} route={route} icon={icon}
                                              checkActive={checkActive}/>
                    )}
                </List>
            </div>
        ))
    );
};

export default Navigation;
