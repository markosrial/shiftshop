import React, {useMemo} from 'react';
import {Badge, Box} from '@material-ui/core';
import {useSelector} from 'react-redux';

import * as selectors from '../selectors';

const CartBadgeCount = ({Icon}) => {

    const cartCount = useSelector(selectors.getShoppingCartCount);

    return (
        <Badge color="secondary" badgeContent={<Box fontWeight={700}>{cartCount}</Box>}>
            {Icon}
            &nbsp;
        </Badge>
    );

};

export default CartBadgeCount;
