import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {Button, Card, CardActions, CardContent, CardHeader, Divider} from '@material-ui/core';
import {ClearAll, DoubleArrow} from '@material-ui/icons';

import useStyles from '../styles/ShoppingCart';

import * as actions from '../actions';
import * as selectors from '../selectors';

const ShoppingCart = () => {

    const classes = useStyles();

    const dispatch = useDispatch();
    const cartCount = useSelector(selectors.getShoppingCartCount);

    const cleanCart = () => dispatch(actions.clearCart());

    return (
        <Card className={classes.card}>
            <CardHeader title={"Shopping Cart"}
                        action={<Button variant="contained" color="secondary" size="small" disableElevation
                                        disabled={cartCount === 0} onClick={cleanCart}>
                                    <ClearAll fontSize="small"/>
                                    &nbsp;
                                    <FormattedMessage id="project.global.button.clear"/>
                                </Button>}/>
            <Divider/>
            <CardContent className={classes.cardContent}>
                <div/>
            </CardContent>
            <Divider/>
            <CardActions>
                <Button variant="contained" color="primary" size="medium" disableElevation
                        disabled={cartCount === 0} onClick={null}>
                    <DoubleArrow/>
                    &nbsp;
                    <FormattedMessage id="project.global.button.payment"/>
                </Button>
            </CardActions>
        </Card>
    );

};

export default ShoppingCart;
