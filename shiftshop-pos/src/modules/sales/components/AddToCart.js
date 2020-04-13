import React from 'react';
import {useDispatch} from 'react-redux';
import {Box, Paper} from '@material-ui/core';
import {FormattedMessage} from 'react-intl';
import {AddShoppingCart} from '@material-ui/icons';

import * as actions from '../actions';
import CatalogAutocomplete from './CatalogAutocomplete';

const AddToCart = () => {

    const dispatch = useDispatch();

    const addItem = product => {

        if (product) {
            dispatch(actions.addToCart(product.id));
        }

    };

    return (
        <Paper>
            <Box display="flex" alignItems="center" px={2} py={1}>
                <AddShoppingCart fontSize="small"/>
                &nbsp;
                <CatalogAutocomplete label={<FormattedMessage id="project.sales.AddToCart.searchLabel"/>}
                                     onSelect={addItem} />
            </Box>
        </Paper>
    );

};


export default AddToCart;
