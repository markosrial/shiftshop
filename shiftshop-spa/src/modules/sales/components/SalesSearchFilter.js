import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {Divider, Icon, Paper, Tooltip, withStyles} from '@material-ui/core';
import {ToggleButton, ToggleButtonGroup} from '@material-ui/lab';
import {ArrowDownward, ArrowUpward, Error, Event, MonetizationOn} from '@material-ui/icons';

import {barcodeIcon} from '../../../assets/images';
import useStyles from '../styles/SalesSearchFilter';

import SaleOrderBy from '../constants/SaleOrderBy';

import * as actions from '../actions';
import * as selectors from '../selectors';
import {SearchDirection} from '../../common';

const orderByTypes = Object.values(SaleOrderBy);
const directionTypes = Object.values(SearchDirection);

const OrderByIcon = ({type}) => {
    switch (type) {
        case SaleOrderBy.BARCODE:
            return (
                <Icon style={{height:'100%', textAlign: 'center'}}>
                    <img src={barcodeIcon} alt="barcode icon"/>
                </Icon>
            );
        case SaleOrderBy.DATE:
            return <Event/>;
        case SaleOrderBy.TOTAL:
            return <MonetizationOn/>
        default:
            return <Error/>
    }
}

const DirectionIcon = ({type}) => {
    switch (type) {
        case SearchDirection.ASC:
            return <ArrowUpward/>;
        case SearchDirection.DESC:
            return <ArrowDownward/>;
        default:
            return <Error/>
    }
}

const StyledToggleButtonGroup = withStyles((theme) => ({
    grouped: {
        margin: theme.spacing(0.5),
        border: 'none',
        padding: theme.spacing(0, 1),
        '&:not(:first-child)': {
            borderRadius: theme.shape.borderRadius,
        },
        '&:first-child': {
            borderRadius: theme.shape.borderRadius,
        },
    },
})) (ToggleButtonGroup);

const SalesSearchFilter = () => {

    const classes = useStyles();

    const dispatch = useDispatch();
    const searchFilter = useSelector(selectors.getSearchFilter);
    const {orderBy, direction} = searchFilter;

    const saveOrderBy = (e, newOrderBy) => {

        if (!newOrderBy) {
            return;
        }

        dispatch(actions.changeSearchOrderBy(newOrderBy));

    }

    const saveDirection = (e, newDirection) => {

        if (!newDirection) {
            return;
        }

        dispatch(actions.changeSearchDirection(newDirection));

    }

    return (
        <Paper elevation={0} className={classes.paper}>
            <StyledToggleButtonGroup size="small" value={orderBy} exclusive
                                     onChange={saveOrderBy}>
                {orderByTypes.map(type =>
                    <Tooltip key={type} value={type} enterDelay={700}
                             title={<FormattedMessage id={`project.global.field.${type}`}/>}>
                        <ToggleButton >
                            <OrderByIcon type={type}/>
                        </ToggleButton>
                    </Tooltip>
                )}
            </StyledToggleButtonGroup>
            <Divider orientation="vertical" className={classes.divider}/>
            <StyledToggleButtonGroup size="small" value={direction} exclusive
                                     onChange={saveDirection}>
                {directionTypes.map(type =>
                    <Tooltip key={type} value={type} enterDelay={700}
                             title={<FormattedMessage id={`project.global.button.${type}`}/>}>
                        <ToggleButton>
                            <DirectionIcon type={type}/>
                        </ToggleButton>
                    </Tooltip>
                )}
            </StyledToggleButtonGroup>
        </Paper>
    );

}

export default SalesSearchFilter;
