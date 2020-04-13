import React, {useMemo} from 'react';
import {Badge, Box} from '@material-ui/core';
import {useSelector} from 'react-redux';

import * as selectors from '../selectors';

const CartBadgeCount = ({Icon}) => {

    const cartCount = useSelector(selectors.getShoppingCartCount);

    return (
        <Badge color="secondary" max={99} badgeContent={cartCount}>
            {Icon}
            &nbsp;
        </Badge>
    );

};

export default CartBadgeCount;
