import React from 'react';
import {useDispatch} from 'react-redux';
import {Box, Paper} from '@material-ui/core';
import {FormattedMessage} from 'react-intl';

import * as actions from '../actions';
import CatalogAutocomplete from './CatalogAutocomplete';

const AddToCart = () => {

    const dispatch = useDispatch();

    const addItem = product => {

        console.log(product);

        if (product) {
            dispatch(actions.addToCart(product.id));
        }

    };

    return (
        <Paper>
            <Box px={2} py={1}>
                <CatalogAutocomplete label={<FormattedMessage id="project.sales.AddToCart.searchLabel"/>}
                                     onSelect={addItem} />
            </Box>
        </Paper>
    );

};


export default AddToCart;
