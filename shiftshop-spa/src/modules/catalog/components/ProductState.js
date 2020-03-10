import React from 'react';
import {FormattedMessage} from 'react-intl';
import {Badge, Box} from '@material-ui/core';

import useStyles from '../styles/ProductState';

const ProductState = ({active, showMessage}) => {
    const classes = useStyles();

    return (
        <Box display="flex" alignItems="center" className={active ? classes.active : classes.inactive}>
            <Badge className={classes.statusBadge} color={active ? "primary" : "secondary"} badgeContent=" "/>
            <span className={classes.statusMessage}>
                {showMessage && <FormattedMessage  id={`project.global.field.state.${active ? 'active' : 'inactive'}`}/>}
            </span>
        </Box>
    );
};

export default ProductState;
