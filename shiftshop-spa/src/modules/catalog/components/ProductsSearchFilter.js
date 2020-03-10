import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
import {Button, Divider, Drawer, FormControlLabel, Radio, RadioGroup, Switch} from '@material-ui/core';
import {Close, Delete, Save} from '@material-ui/icons';

import SearchOrderBy from '../constants/SearchOrderBy';
import SearchOrder from '../constants/SearchOrder';

import useStyles from '../styles/ProductsSearchFilter';

import * as actions from '../actions';
import * as selectors from '../selectors';

const orderByTypes = Object.values(SearchOrderBy);
const orderTypes = Object.values(SearchOrder);

const ProductsSearchFilter = ({filterOpen, closeFilter}) => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const searchFilter = useSelector(selectors.getSearchFilter);

    const [orderBy, setOrderBy] = useState(searchFilter.orderBy);
    const [order, setOrder] = useState(searchFilter.order);
    const [onlyActive, setOnlyActive] = useState(searchFilter.onlyActive);

    useEffect(() => {
        // clean unsaved changes on filter on open/close
        resetFilters();
        // eslint-disable-next-line
    }, [filterOpen]);

    const resetFilters = () => {
        setOrderBy(searchFilter.orderBy);
        setOrder(searchFilter.order);
        setOnlyActive(searchFilter.onlyActive);
    };

    const saveSearchFilter = () => {
        dispatch(actions.changeSearchFilter({orderBy, order, onlyActive}));
        closeFilter();
    };
    const resetSearchFilter = () => {
        dispatch(actions.resetSearchFilter(searchFilter));
        closeFilter();
    };

    return (
        <Drawer anchor="right" open={filterOpen} onClose={closeFilter} variant="temporary">
            <div className={classes.content}>
                <div className={classes.header}>
                    <Button onClick={closeFilter} size="small">
                        <Close fontSize="small"/>
                        <FormattedMessage id="project.global.button.close" />
                    </Button>
                </div>
                <div className={classes.filters}>
                    <div className={classes.section}>
                        <div className={classes.subTitle}>
                            <FormattedMessage id="project.catalog.ProductsSearchFilter.orderBy"/>
                        </div>
                        <RadioGroup value={orderBy} onChange={event => setOrderBy(event.target.value)}>
                            {orderByTypes.map(orderBy =>
                                <FormControlLabel key={orderBy} control={<Radio color="primary"/>} value={orderBy}
                                                  label={<FormattedMessage id={"project.catalog.ProductsSearchFilter.label." + orderBy}/>} />)}
                        </RadioGroup>
                        <Divider/>
                    </div>
                    <div className={classes.section}>
                        <div className={classes.subTitle}>
                            <FormattedMessage id="project.catalog.ProductsSearchFilter.order"/>
                        </div>
                        <RadioGroup value={order} onChange={event => setOrder(event.target.value)}>
                            {orderTypes.map(order =>
                                <FormControlLabel key={order} control={<Radio color="primary"/>} value={order}
                                                  label={<FormattedMessage id={"project.catalog.ProductsSearchFilter.label." + order}/>} />)}
                        </RadioGroup>
                        <Divider/>
                    </div>
                    <div className={classes.section}>
                        <div className={classes.subTitle}>
                            <FormattedMessage id="project.catalog.ProductsSearchFilter.more"/>
                        </div>
                        <FormControlLabel control={<Switch checked={onlyActive} color="primary" onChange={_ => setOnlyActive(!onlyActive)}/>}
                                          label={<FormattedMessage id="project.catalog.ProductsSearchFilter.label.onlyActive"/>}/>
                    </div>
                </div>
                <div>
                    <Button className={classes.actionButton} color="secondary" variant="contained" fullWidth
                            onClick={resetSearchFilter}>
                        <Delete/>&nbsp;<FormattedMessage id="project.global.button.reset"/>
                    </Button>
                    <Button className={classes.actionButton} color="primary" variant="contained" fullWidth
                            onClick={saveSearchFilter}>
                        <Save/>&nbsp;<FormattedMessage id="project.global.button.save"/>
                    </Button>
                </div>
            </div>
        </Drawer>
    );
};

ProductsSearchFilter.propTypes = {
    filterOpen: PropTypes.bool.isRequired,
    closeFilter: PropTypes.func.isRequired
};

export default ProductsSearchFilter;
