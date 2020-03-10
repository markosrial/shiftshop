import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
import {Button, Collapse, List, ListItem} from '@material-ui/core';
import {ExpandLess, ExpandMore} from '@material-ui/icons';

import useStyles from '../styles/NavigationCollapse';

import NavigationItem from './NavigationItem';

const NavigationCollapse = ({title, icon, route, children, checkActive, checkPermissions}) => {
    const classes = useStyles();

    const Icon = icon;
    const [open, setOpen] = useState(checkActive(route));

    const handleToggle = () => setOpen(open => !open);

    return (

        <ListItem key={title} className={classes.item} disableGutters>
            <Button className={classes.button} onClick={handleToggle}>
                {icon && <Icon className={classes.icon} />}
                <FormattedMessage id={title}/>
                {open
                    ? (<ExpandLess
                        className={classes.expandIcon}
                        color="inherit"/>)
                    : (<ExpandMore
                        className={classes.expandIcon}
                        color="inherit"/>)}
            </Button>
            <Collapse in={open}>
                <List className={classes.list}>
                    {children.map(({title, route, permissions}) =>
                        (checkPermissions(permissions) &&
                            <NavigationItem key={title} title={title} route={route} checkActive={checkActive}/>)
                    )}
                </List>
            </Collapse>
        </ListItem>
    );
};

NavigationCollapse.propTypes = {
    title: PropTypes.string.isRequired,
    route: PropTypes.string.isRequired,
    icon: PropTypes.object.isRequired,
    children: PropTypes.array.isRequired,
    checkActive: PropTypes.func.isRequired,
    checkPermissions: PropTypes.func.isRequired,
};

export default NavigationCollapse;
