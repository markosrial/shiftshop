import React, {Fragment, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useSnackbar} from 'notistack';
import {FormattedMessage} from 'react-intl';
import NumberFormat from 'react-number-format';
import {
    Box,
    Button, CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    List,
    ListItem,
    Paper,
    TextField,
    Typography
} from '@material-ui/core';
import {Close, Print, Save} from '@material-ui/icons';

import {generateBarcode, fixedDecimal} from '../../utils';
import * as actions from '../actions';
import * as selectors from '../selectors';
import records from '../../records';
import users from '../../users';

const AddSale = ({discount, closeDialog}) => {

    const {enqueueSnackbar} = useSnackbar();

    const dispatch = useDispatch();
    const catalog = useSelector(selectors.getCatalog);
    const shoppingCart = useSelector(selectors.getShoppingCart);
    const cartCount = useSelector(selectors.getShoppingCartCount);
    const cartSubtotal = useSelector(selectors.getShoppingCartSubtotal);
    const user = useSelector(users.selectors.getUser);

    const salesDB = useSelector(records.selectors.getSalesDB);

    const [cash, setCash] = useState(null);
    const [saving, setSaving] = useState(false);

    const total = useMemo(() => fixedDecimal(cartSubtotal - (discount || 0)), [cartSubtotal, discount]);

    const cashError = (cash !== null) && (cash < total);

    const change = useMemo(() => {

        if (cash && cash >= total) {

            return fixedDecimal(cash - total);

        }

        return null;

    }, [cash]);

    const getSale = () => {

        const saleTimestamp = new Date();

        // Adding name on product in case that product is removed from
        // catalog, also this allow to reprint the ticket with the price
        // and the name used on the moment of the sale
        const items = shoppingCart.map(
            item => {

                const product = selectors.getProductById(catalog, item.id);

                if (!product) return null;

                return {
                    id: product.id,
                    name: product.name,
                    salePrice: product.salePrice,
                    quantity: item.quantity
                };

            }
        );

        return {
            _id: saleTimestamp.toISOString(),
            barcode: generateBarcode(),
            date: saleTimestamp,
            items,
            sellerId: user.id,
            total,
            discount,
            cash,
            uploaded: false
        };

    };

    const saveSale = (print = false) => {

        if (saving) return;

        setSaving(true);

        const sale = getSale();

        records.actions.saveSale(salesDB, sale,
            () => {
                enqueueSnackbar(<FormattedMessage id="project.sales.AddSale.success"/>, {variant: 'success'});
                dispatch(actions.clearCart());
                closeDialog();
            },
            error => {
                enqueueSnackbar(<FormattedMessage id="project.sales.AddSale.error"/>, {variant: 'error'});
                setSaving(false);
            });

    };

    return (
        <Dialog open fullWidth scroll="body">
            <DialogTitle>
                <Box display="flex" alignItems="center">
                    <Typography variant="h5"><FormattedMessage id="project.sales.AddSale.title"/></Typography>
                    <Box flexGrow={1}/>
                    <IconButton onClick={closeDialog} disabled={saving}><Close/></IconButton>
                </Box>
            </DialogTitle>
            <DialogContent dividers>
                <List component={Paper} style={{paddingTop: 0, paddingBottom: 0}}>
                    <ListItem selected>
                        <Box display="flex" width={1}>
                            <Box fontWeight={700} fontStyle="italic" flexGrow={1}>
                                <FormattedMessage id="project.sales.AddSale.numItems"/>&nbsp;
                            </Box>
                            <Box>{cartCount}</Box>
                        </Box>
                    </ListItem>
                    <ListItem>
                        <Box width={1}>
                            {discount &&
                                <Fragment>
                                    <Box display="flex" width={1} mb={1}>
                                        <Box fontWeight={700} fontStyle="italic" flexGrow={1}>
                                            <FormattedMessage id="project.global.field.subtotal"/>:&nbsp;
                                        </Box>
                                        <Box>{cartSubtotal.toFixed(2)} €</Box>
                                    </Box>
                                    <Box display="flex" width={1} mb={1}>
                                        <Box fontWeight={700} fontStyle="italic" flexGrow={1}>
                                            <FormattedMessage id="project.global.field.discount"/>:&nbsp;
                                        </Box>
                                        <Box>{discount.toFixed(2)} €</Box>
                                    </Box>
                                </Fragment>}
                            <Box display="flex" width={1} fontSize="h4.fontSize">
                                <Box fontWeight={700} fontStyle="italic" flexGrow={1}>
                                    <FormattedMessage id="project.global.field.total"/>:&nbsp;
                                </Box>
                                <Box fontWeight={700}>{total.toFixed(2)} €</Box>
                            </Box>
                        </Box>
                    </ListItem>
                    {(total >  0) && <ListItem selected>
                        <Box width={1}>
                            <Box display="flex" alignItems="center" width={1}>
                                <Box fontWeight={700} fontStyle="italic" flexGrow={1}>
                                    <FormattedMessage id="project.global.field.cash"/>
                                </Box>
                                <NumberFormat value={cash} onValueChange={values => setCash(values.floatValue)}
                                              autoFocus disabled={saving} error={cashError}
                                              inputProps={{style: { textAlign: "right" }}}
                                              decimalScale={2} fixedDecimalScale suffix=" €" allowNegative={false}
                                              customInput={TextField} margin="dense"/>
                            </Box>
                            <Box display="flex" alignItems="center" width={1} disabled>
                                <Box fontWeight={700} fontStyle="italic" flexGrow={1}>
                                    <FormattedMessage id="project.global.field.change"/>
                                </Box>
                                <NumberFormat value={change} disabled
                                              inputProps={{style: { textAlign: "right", fontWeight: 700, color: 'black'}}}
                                              decimalScale={2} fixedDecimalScale suffix=" €" allowNegative={false}
                                              customInput={TextField} margin="dense"/>
                            </Box>
                        </Box>
                    </ListItem>}
                </List>
            </DialogContent>
            <DialogActions>
                {saving && <CircularProgress size={24}/>}
                <Button color="primary" variant="contained" disableElevation
                        onClick={() => saveSale(false)} disabled={saving || cashError}>
                    <Save fontSize="small"/>
                    &nbsp;
                    <FormattedMessage id="project.global.button.save"/>
                </Button>
                <Button color="primary" variant="contained" disableElevation
                        onClick={() => saveSale(true)} disabled={saving  || cashError}>
                    <Print fontSize="small"/>
                    &nbsp;
                    <FormattedMessage id="project.global.button.printAndSave"/>
                </Button>
            </DialogActions>
        </Dialog>
    );

};

export default AddSale;
