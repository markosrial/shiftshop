import React, {useEffect, useRef, useState} from 'react';
import {FormattedMessage} from 'react-intl';
import {Card, CardContent, CardHeader, Divider, Grid} from '@material-ui/core';

import SalesSearchFilter from './SalesSearchFilter';
import SalesSearchResult from './SalesSearchResult';
import SalesSearchBar from './SalesSearchBar';

const SalesSearch = () =>  {

    const [searching, setSearching] = useState(false);

    const _isMounted = useRef(true);
    useEffect(() => {
        return () => _isMounted.current = false;
        // eslint-disable-next-line
    }, []);

    const startSearch = () => {if (_isMounted.current) setSearching(true)};
    const stopSearch = () => {if (_isMounted.current) setSearching(false)};

    return (
        <Card>
            <CardHeader title={<FormattedMessage id="project.sales.SalesSearch.title"/>}/>
            <Divider/>
            <CardContent>
                <Grid container spacing={1} justify="center">
                    <Grid item>
                        <SalesSearchBar searching={searching} startSearch={startSearch} stopSearch={stopSearch}/>
                    </Grid>
                    <Grid item>
                        <SalesSearchFilter/>
                    </Grid>
                </Grid>
                <SalesSearchResult searching={searching} startSearch={startSearch} stopSearch={stopSearch}/>
            </CardContent>
        </Card>
    );

}

export default SalesSearch;
