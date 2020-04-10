import React, {Fragment, useState} from 'react';
import {useSelector} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    IconButton,
    TextField
} from '@material-ui/core';
import {Clear, DoubleArrow} from '@material-ui/icons';
import NumberFormat from 'react-number-format';

import useStyles from '../styles/ShoppingCart';

import * as selectors from '../selectors';
import CartContent from './CartContent';
import CleanCart from './CleanCart';
import CartTotal from './CartTotal';

const ShoppingCart = () => {

    const classes = useStyles();

    const cartCount = useSelector(selectors.getShoppingCartCount);
    const cartSubtotal = useSelector(selectors.getShoppingCartSubtotal);

    const [discount, setDiscount] = useState(null);

    const handleChangeDiscount = value => {

        if (value && Number.parseFloat(value) > cartSubtotal) {
            setDiscount(cartSubtotal);
            return;
        }

        setDiscount(value);

    };

    return (
        <Card className={classes.card}>
            <CardHeader title={<FormattedMessage id="project.sales.ShoppingCart.title"/>}
                        action={<CleanCart/>}/>
            <Divider/>
            <CardContent className={classes.cardContent}>
                <CartContent/>
            </CardContent>
            <Divider/>
            <CardActions>
                <Box className={classes.actionsBox} display="flex" alignItems="center">
                    {(cartCount > 0) &&
                        <NumberFormat value={discount} onValueChange={values => handleChangeDiscount(values.value)}
                                      inputProps={{style: { textAlign: "right" }}}
                                      decimalScale={2} fixedDecimalScale suffix=" €" allowNegative={false}
                                      customInput={TextField} variant="outlined" margin="dense"
                                      label={<FormattedMessage id="project.global.field.discount"/>}
                                      InputProps={{
                                          startAdornment:
                                              discount && <IconButton onClick={() => setDiscount(null)}>
                                                  <Clear fontSize="small"/>
                                              </IconButton>,
                                      }}/>}
                    <Box flexGrow={1}/>
                    <Button variant="contained" color="primary" size="medium" disableElevation
                            disabled={cartCount === 0} onClick={null}>
                        <DoubleArrow/>
                        &nbsp;
                        <FormattedMessage id="project.global.button.payment"/>
                        {(cartCount > 0) &&
                            <Fragment>
                                &nbsp;
                                (<FormattedMessage id="project.global.field.total"/>: <CartTotal discount={discount}/>)
                            </Fragment>
                        }
                    </Button>
                </Box>
            </CardActions>
        </Card>
    );

};

export default ShoppingCart;
