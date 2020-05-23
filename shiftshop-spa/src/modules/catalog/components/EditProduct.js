import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {useSnackbar} from 'notistack';
import PropTypes from 'prop-types';
import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography
} from '@material-ui/core';

import useStyles from '../styles/EditCategory';

import * as actions from '../actions';
import {formValidator} from '../../../utils';
import {Alert, ErrorContent, PriceInput} from '../../common';
import CategorySelector from './CategorySelector';

const EditProduct = ({product, onClose}) => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();

    const _isMounted = useRef(true);
    useEffect(() => {
        return () => _isMounted.current = false
    }, []);

    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [providerPrice, setProviderPrice] = useState('');
    const [salePrice, setSalePrice] = useState('');
    const [barcode, setBarcode] = useState('');
    const [updating, setUpdating] = useState(false);
    const [errors, setErrors] = useState(null);

    const handleChangeName = event => setName(event.target.value);
    const handleChangeCategory = event => setCategory(event.target.value);
    const handleChangeProviderPrice = event => setProviderPrice(event.target.value);
    const handleChangeSalePrice = event => setSalePrice(event.target.value);
    const handleChangeBarcode = event => setBarcode(event.target.value);

    const closeErrors = () => setErrors(null);

    const isValidName = useMemo(() => formValidator.isNotEmpty(name), [name]);
    const isValidCategory = useMemo(() => formValidator.isCategorySelected(category), [category]);
    const isValidProviderPrice = useMemo(() => formValidator.isValidPrice(providerPrice), [providerPrice]);
    const isValidSalePrice = useMemo(() => formValidator.isValidPrice(salePrice), [salePrice]);
    const isValidBarcode = useMemo(() => formValidator.isNotEmpty(barcode), [barcode]);

    const checkValid = isValidName || isValidCategory || isValidProviderPrice || isValidSalePrice || isValidBarcode;

    const handleSubmit = e => {

        e.preventDefault();
        closeErrors();

        if (checkValid && !updating) {
            editProduct();
        }
    };

    const editProduct = () => {

        if (updating) return;

        setUpdating(true);

        const data = {
            name: name ? name.trim() : null,
            categoryId: category !== "" ? category : null,
            providerPrice,
            salePrice,
            barcode: barcode ? barcode.trim() : null
        };

        dispatch(
            actions.updateProduct(
                product.id, data,
                _ => {
                    enqueueSnackbar(<FormattedMessage id="project.catalog.EditProduct.success"/>,
                        {
                            variant: 'success',
                            autoHideDuration: 1500,
                        });
                    onClose();
                },
                errors => {
                    if (_isMounted.current) {
                        setErrors(errors)
                    } else {
                        enqueueSnackbar(<ErrorContent errors={errors}/>,
                            {
                                variant: 'error',
                                persist: 'true',
                                action: key => (<Button color="inherit" variant="outlined" onClick={() => closeSnackbar(key)}>
                                    <FormattedMessage id="project.global.button.close"/>
                                </Button>)
                            });
                    }
                },
                () => _isMounted.current && setUpdating(false)));

    };

    if (!product || !onClose) {
        return null;
    }

    return (
        <Dialog open fullWidth scroll="body" onClose={onClose}>
            <DialogTitle>
                <Typography component="span" variant="h5">
                    <FormattedMessage id="project.catalog.EditProduct.title"/>: <i>{product.name}</i>
                </Typography>
            </DialogTitle>
            <form onSubmit={e => handleSubmit(e)} noValidate>
                <DialogContent dividers>
                    {errors && <Alert className={classes.alert} variant="error" message={errors} onClose={closeErrors} backendError/>}
                    <TextField autoFocus margin="dense" type="text" variant="outlined" fullWidth
                               label={<FormattedMessage id="project.global.field.name"/>}
                               value={name} onChange={handleChangeName}/>
                    <CategorySelector selectedCategory={category} handleSelectedCategory={handleChangeCategory} previous={product.categoryId}
                                      variant="outlined" margin="dense" fullWidth empty disabled={updating}/>
                    <TextField label={<Box whiteSpace="nowrap"><FormattedMessage id="project.global.field.providerPrice"/> ({product.providerPrice.toFixed(2)} €)</Box>}
                               type="text" margin="dense" variant="outlined" disabled={updating}
                               value={providerPrice} onChange={handleChangeProviderPrice} fullWidth
                               InputProps={{inputComponent: PriceInput,
                                   inputProps: { decimalScale: 2, fixedDecimalScale: true }}}/>
                    <TextField label={<Box whiteSpace="nowrap"><FormattedMessage id="project.global.field.salePrice"/> ({product.salePrice.toFixed(2)} €)</Box>}
                               type="text" margin="dense" variant="outlined" disabled={updating}
                               value={salePrice} onChange={handleChangeSalePrice} fullWidth
                               InputProps={{inputComponent: PriceInput,
                                   inputProps: { decimalScale: 2, fixedDecimalScale: true}}}/>
                    <TextField margin="dense" type="text" variant="outlined" fullWidth
                               label={<Box whiteSpace="nowrap"><FormattedMessage id="project.global.field.barcode"/> ({product.barcode})</Box>}
                               value={barcode} onChange={handleChangeBarcode}/>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" size="small" color="default" onClick={onClose} disableElevation>
                        <FormattedMessage id="project.global.button.cancel"/>
                    </Button>
                    <Button variant="contained" size="small" color="primary" type="submit" disableElevation
                            disabled={!checkValid || updating}>
                        <FormattedMessage id="project.global.button.accept"/>
                        {updating && <CircularProgress className={classes.buttonProgress} size={24}/>}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

EditProduct.propTypes = {
    product: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired
};

export default EditProduct;
