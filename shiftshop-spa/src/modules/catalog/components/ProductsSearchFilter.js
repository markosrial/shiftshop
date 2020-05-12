import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
import {Button, Divider, Drawer, FormControlLabel, Radio, RadioGroup, Switch} from '@material-ui/core';
import {Close, Delete} from '@material-ui/icons';

import {SearchDirection} from '../../common';
import ProductOrderBy from '../constants/ProductOrderBy';

import useStyles from '../styles/ProductsSearchFilter';

import * as actions from '../actions';
import * as selectors from '../selectors';

const orderByTypes = Object.values(ProductOrderBy);
const orderTypes = Object.values(SearchDirection);

const ProductsSearchFilter = ({filterOpen, closeFilter}) => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const searchFilter = useSelector(selectors.getSearchFilter);
    const {orderBy, order, onlyActive} = searchFilter;

    const saveOrderBy = e =>
        dispatch(actions.changeSearchFilter({...searchFilter, orderBy: e.target.value}));

    const saveOrder = e =>
        dispatch(actions.changeSearchFilter({...searchFilter, order: e.target.value}));

    const saveOnlyActive = _ =>
        dispatch(actions.changeSearchFilter({...searchFilter, onlyActive: !onlyActive}));

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
                        <RadioGroup value={orderBy} onChange={saveOrderBy}>
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
                        <RadioGroup value={order} onChange={saveOrder}>
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
                        <FormControlLabel control={<Switch checked={onlyActive} color="primary" onChange={saveOnlyActive}/>}
                                          label={<FormattedMessage id="project.catalog.ProductsSearchFilter.label.onlyActive"/>}/>
                    </div>
                </div>
                <div>
                    <Button className={classes.actionButton} color="secondary" variant="contained" fullWidth
                            onClick={resetSearchFilter}>
                        <Delete/>&nbsp;<FormattedMessage id="project.global.button.reset"/>
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
