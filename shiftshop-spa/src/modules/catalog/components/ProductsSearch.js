import React, {useEffect, useRef, useState} from 'react';
import {FormattedMessage} from 'react-intl';
import {Card, CardContent, CardHeader, Divider, IconButton} from '@material-ui/core';
import {FilterList} from '@material-ui/icons';

import useStyles from '../styles/ProductSearch';

import ProductsSearchBar from './ProductsSearchBar';
import ProductsSearchFilter from './ProductsSearchFilter';
import ProductsSearchResult from './ProductsSearchResult';

const ProductsSearch = () => {

    const classes = useStyles();

    const [searching, setSearching] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);

    const _isMounted = useRef(true);
    useEffect(() => {
        return () => _isMounted.current = false
        // eslint-disable-next-line
    }, []);

    const startSearch = () => {if (_isMounted.current) setSearching(true)};
    const stopSearch = () => {if (_isMounted.current) setSearching(false)}

    return (
        <Card>
            <CardHeader title={<FormattedMessage id="project.catalog.ProductsSearch.title"/>}
                        action={<IconButton size="medium" className={classes.filterButton}
                                            onClick={() => setFilterOpen(true)}>
                            <FilterList/>
                        </IconButton>}/>
            <Divider/>
            <CardContent>
                <ProductsSearchBar searching={searching} startSearch={startSearch} stopSearch={stopSearch}/>
                <ProductsSearchFilter filterOpen={filterOpen} closeFilter={() => setFilterOpen(false)}/>
                <ProductsSearchResult searching={searching} startSearch={startSearch} stopSearch={stopSearch}/>
            </CardContent>
        </Card>
    );
};

export default ProductsSearch;
