import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import {Button, ListItem} from '@material-ui/core';

import useStyles from '../styles/NavigationItem';

const NavigationItem = ({title, route, icon, checkActive}) => {
    const classes = useStyles();

    const Icon = icon;

    return (
        <ListItem key={title} className={classes.item} disableGutters>
            <Button className={checkActive(route) ? classes.buttonActive : classes.button} component={Link} to={route} fullWidth>
                {icon && <Icon className={classes.icon} />}
                <span className={!icon ? classes.textNoIcon : undefined}>
                    <FormattedMessage id={title}/>
                </span>
            </Button>
        </ListItem>
    );
};

NavigationItem.propTypes = {
    title: PropTypes.string.isRequired,
    route: PropTypes.string.isRequired,
    icon: PropTypes.object,
    checkActive: PropTypes.func.isRequired
};

export default NavigationItem;
