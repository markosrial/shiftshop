import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {Card, CardContent, CardHeader, Divider, IconButton} from '@material-ui/core';
import {FilterList} from '@material-ui/icons';

import useStyles from '../styles/ProductSearch';

import * as actions from '../actions';
import * as selectors from '../selectors';
import ProductsSearchBar from './ProductsSearchBar';
import ProductsSearchFilter from './ProductsSearchFilter';
import ProductsSearchResult from './ProductsSearchResult';

const ProductsSearch = () => {

    const classes = useStyles();

    const dispatch = useDispatch();
    const searchFilter = useSelector(selectors.getSearchFilter);

    const _isMounted = useRef(true);
    useEffect(() => {
        return () => _isMounted.current = false
    }, []);

    const [category, setCategory] = useState('');
    const [keywords, setKeywords] = useState('');
    const [searching, setSearching] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);

    const handleChangeKeywords = event => setKeywords(event.target.value);
    const handleChangeCategory = event => setCategory(event.target.value);
    const startSearch = () => {if (_isMounted.current) setSearching(true)};
    const stopSearch = () => {if (_isMounted.current) setSearching(false)};

    const search = () => {

        if (searching) return;

        setSearching(true);

        const criteria = {
            categoryId: category !== '' ? category : null,
            keywords: keywords.trim(),
            page: 0,
            ...searchFilter
        };

        dispatch(actions.findProducts(criteria, stopSearch));

    };

    return (
        <Card>
            <CardHeader title={<FormattedMessage id="project.catalog.ProductsSearch.title"/>}
                        action={<IconButton size="medium" className={classes.filterButton}
                                            onClick={() => setFilterOpen(true)}>
                            <FilterList/>
                        </IconButton>}/>
            <Divider/>
            <CardContent>
                <ProductsSearchBar keywords={keywords} handleChangeKeywords={handleChangeKeywords}
                                   category={category} handleChangeCategory={handleChangeCategory}
                                   searching={searching} onSearch={search}/>
                <ProductsSearchFilter filterOpen={filterOpen} closeFilter={() => setFilterOpen(false)}/>
                <ProductsSearchResult searching={searching} startSearch={startSearch} stopSearch={stopSearch}/>
            </CardContent>
        </Card>
    );
};

export default ProductsSearch;
