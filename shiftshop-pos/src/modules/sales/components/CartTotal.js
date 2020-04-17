import React, {Fragment} from 'react';
import {useSelector} from 'react-redux';

import * as selectors from '../selectors';

const CartTotal = ({discount}) => {

    const subtotal = useSelector(selectors.getShoppingCartSubtotal);

    return (<Fragment>{(subtotal - (discount || 0)).toFixed(2)} €</Fragment>);

};

export default CartTotal;
