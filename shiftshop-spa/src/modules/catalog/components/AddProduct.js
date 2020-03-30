import React, {useEffect, useMemo, useRef, useState} from 'react';
import {FormattedMessage} from 'react-intl';
import {useSnackbar} from 'notistack';
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
import {Add, AddBox} from '@material-ui/icons';

import useStyles from '../styles/AddProduct';

import * as actions from '../actions';
import {formValidator} from '../../../utils';
import {Alert, ErrorContent, PriceInput} from '../../common';
import CategorySelector from './CategorySelector';

const AddProduct = () => {
    const classes = useStyles();

    const {enqueueSnackbar, closeSnackbar} = useSnackbar();

    const _isMounted = useRef(true);
    useEffect(() => {
        return () => _isMounted.current = false
    }, []);

    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [providerPrice, setProviderPrice] = useState('');
    const [salePrice, setSalePrice] = useState('');
    const [adding, setAdding] = useState(false);
    const [errors, setErrors] = useState(null);
    const [open, setOpen] = useState(false);

    const handleChangeName = event => setName(event.target.value);
    const handleChangeCategory = event => setCategory(event.target.value);
    const handleChangeProviderPrice = event => setProviderPrice(event.target.value);
    const handleChangeSalePrice = event => setSalePrice(event.target.value);

    const closeErrors = () => setErrors(null);
    const openDialog = () => setOpen(true);
    const closeDialog = () => setOpen(false);

    const resetForm = () => {
        if (_isMounted.current) {
            setName('');
            setCategory('');
            setProviderPrice('');
            setSalePrice('');
        }
    };

    const isValidName = useMemo(() => formValidator.isNotEmpty(name), [name]);
    const isValidCategory = useMemo(() => formValidator.isCategorySelected(category), [category]);
    const isValidProviderPrice = useMemo(() => formValidator.isValidPrice(providerPrice), [providerPrice]);
    const isValidSalePrice = useMemo(() => formValidator.isValidPrice(salePrice), [salePrice]);

    const checkValid = isValidName && isValidCategory && isValidProviderPrice && isValidSalePrice;

    const handleSubmit = e => {

        e.preventDefault();
        closeErrors();

        if (checkValid && !adding) {
            addProduct();
        }
    };

    const addProduct = () => {

        if (adding) return;

        setAdding(true);

        const product = {
            name: name.trim(),
            categoryId: category,
            providerPrice: parseFloat(providerPrice),
            salePrice: parseFloat(salePrice)
        };

        actions.addProduct(product,
            _ => {
                enqueueSnackbar(<FormattedMessage id="project.catalog.AddProduct.success"/>,
                    {
                        variant: 'success',
                        autoHideDuration: 1500,
                    });
                _isMounted.current && resetForm();
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
            () => _isMounted.current && setAdding(false));

    };

    return (
        <div>
            <Button color="primary" variant="contained" size="small" onClick={openDialog}>
                <Add/> <FormattedMessage id="project.catalog.AddProduct.addButton"/>
            </Button>
            <Dialog className={classes.root} fullWidth scroll="body" open={open} onClose={closeDialog}>
                <DialogTitle>
                    <Box display="flex" alignItems="center">
                        <AddBox fontSize="default" color="primary"/>&nbsp;
                        <Typography variant="h5">
                            <FormattedMessage id="project.catalog.AddProduct.title"/>
                        </Typography>
                    </Box>
                </DialogTitle>
                <form onSubmit={e => handleSubmit(e)} noValidate>
                    <DialogContent dividers>
                        {errors &&
                            <Alert className={classes.alert} message={errors} variant="error"
                                   backendError onClose={closeErrors}/>}
                        <TextField margin="dense" variant="outlined" fullWidth disabled={adding} autoFocus
                                   label={<FormattedMessage id="project.global.field.name"/>} value={name} required
                                   onChange={handleChangeName}/>
                        <CategorySelector selectedCategory={category} handleSelectedCategory={handleChangeCategory}
                                          variant="outlined" margin="dense" fullWidth disabled={adding} required/>
                        <TextField label={<FormattedMessage id="project.global.field.providerPrice"/>}
                                   type="text" margin="dense" variant="outlined" disabled={adding}
                                   value={providerPrice} onChange={handleChangeProviderPrice} fullWidth required
                                   InputProps={{inputComponent: PriceInput,
                                       inputProps: { decimalScale: 2, fixedDecimalScale: true }}}/>
                        <TextField label={<FormattedMessage id="project.global.field.salePrice"/>}
                                   type="text" margin="dense" variant="outlined" disabled={adding}
                                   value={salePrice} onChange={handleChangeSalePrice} fullWidth required
                                   InputProps={{inputComponent: PriceInput,
                                       inputProps: { decimalScale: 2, fixedDecimalScale: true}}}/>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="secondary" onClick={closeDialog} disableElevation>
                            <FormattedMessage id="project.global.button.close"/>
                        </Button>
                        <Button variant="contained" color="primary" type="submit" disabled={!checkValid || adding} disableElevation>
                            {adding && <CircularProgress className={classes.buttonProgress} size={24}/>}
                            <FormattedMessage id="project.global.button.add"/>
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
};

export default AddProduct;
