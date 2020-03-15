import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import {Button, Hidden, TextField} from '@material-ui/core';
import {Search} from '@material-ui/icons';

import useStyles from '../styles/ProductsSearchBar';

import * as actions from '../actions';
import * as selectors from '../selectors';
import CategorySelector from './CategorySelector';

const ProductsSearchBar = ({searching, startSearch, stopSearch}) => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const searchFilter = useSelector(selectors.getSearchFilter);
    const productsSearch = useSelector(selectors.getProductsSearch);

    const [category, setCategory] = useState('');
    const [keywords, setKeywords] = useState('');

    const handleChangeKeywords = event => setKeywords(event.target.value);
    const handleChangeCategory = event => setCategory(event.target.value);

    useEffect(() => {
        if (productsSearch) {
            setCategory(productsSearch.criteria.categoryId || '');
            setKeywords(productsSearch.criteria.keywords || '');
        }
        // eslint-disable-next-line
    }, []);

    const search = () => {

        if (searching) return;

        startSearch();

        const criteria = {
            categoryId: category !== '' ? category : null,
            keywords: keywords.trim(),
            page: 0,
            ...searchFilter
        };

        dispatch(actions.findProducts(criteria, stopSearch));

    };

    const handleSubmit = event => {
        event.preventDefault();
        search();
    };

    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <CategorySelector className={classes.categorySelect} allCategories
                              selectedCategory={category} handleSelectedCategory={handleChangeCategory}
                              variant="outlined" margin="dense" fullWidth/>
            <TextField className={classes.searchText} label={<FormattedMessage id="project.global.field.keywords"/>}
                       value={keywords} onChange={handleChangeKeywords}
                       variant="outlined" margin="dense" fullWidth/>
            <Button className={classes.searchButton} size="medium" variant="contained" color="primary"
                    type="submit" disabled={searching}>
                <Search fontSize="small"/><Hidden smUp>&nbsp;<FormattedMessage id="project.global.button.search"/></Hidden>
            </Button>
        </form>
    );
};

ProductsSearchBar.propTypes = {
    searching: PropTypes.bool.isRequired,
    startSearch: PropTypes.func.isRequired,
    stopSearch: PropTypes.func.isRequired
};


export default ProductsSearchBar;
