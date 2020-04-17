import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {
    Box,
    Button,
    ButtonGroup,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@material-ui/core';
import {AddCircle, RemoveCircle, RemoveShoppingCart} from '@material-ui/icons';

import {emptyCart} from '../../../assets/images';
import useStyles from '../styles/CartContent';

import * as actions from '../actions';
import * as selectors from '../selectors';

const CartContent = () => {

    const classes = useStyles();

    const dispatch = useDispatch();
    const catalog = useSelector(selectors.getCatalog);
    const shoppingCart = useSelector(selectors.getShoppingCart);
    const cartCount = useSelector(selectors.getShoppingCartCount);

    if (cartCount === 0) {
        return (
            <Box className={classes.rootBox}>
                <Box className={classes.emptyPlaceholder}>
                    <img className={classes.image} src={emptyCart} alt="Empty cart"/>
                    <Typography className={classes.emptyText} variant="subtitle1">
                        <FormattedMessage id="project.sales.CartContent.emptyCart"/>
                    </Typography>
                </Box>
            </Box>
        );
    }

    return (
        <TableContainer className={classes.tableContainer} component={Paper}>
            <Table stickyHeader size="small">
                <TableHead>
                    <TableRow>
                        <TableCell><FormattedMessage id="project.global.field.name"/></TableCell>
                        <TableCell align="right"><FormattedMessage id="project.global.field.unitPrice"/></TableCell>
                        <TableCell align="right"><FormattedMessage id="project.global.field.quantity"/></TableCell>
                        <TableCell align="right"><FormattedMessage id="project.global.field.total"/></TableCell>
                        <TableCell align="center"><FormattedMessage id="project.global.field.actions"/></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {shoppingCart.map(
                        item => {

                            const product = selectors.getProductById(catalog, item.id);

                            if (!product) return null;

                            return (
                                <TableRow key={item.id}>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell align="right">{product.salePrice.toFixed(2)} €</TableCell>
                                    <TableCell align="right">x{item.quantity}</TableCell>
                                    <TableCell align="right">{(product.salePrice * item.quantity).toFixed(2)} €</TableCell>
                                    <TableCell align="center">
                                        <ButtonGroup className={classes.actions} variant="contained" aria-label="Cart item actions">
                                            <Button className={classes.productActionAdd} disableElevation
                                                    onClick={() => dispatch(actions.addToCart(product.id))} >
                                                <AddCircle fontSize="small"/>
                                            </Button>
                                            <Button className={classes.productActionSubtract} disableElevation
                                                    onClick={() => dispatch(actions.subtractProductInCart(product.id))}>
                                                <RemoveCircle fontSize="small"/>
                                            </Button>
                                            <Button className={classes.productActionRemove} disableElevation
                                                    onClick={() => dispatch(actions.removeFromCart(product.id))}>
                                                <RemoveShoppingCart fontSize="small"/>
                                            </Button>
                                        </ButtonGroup>
                                    </TableCell>
                                </TableRow>
                            );

                        }
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );

};

export default CartContent;
