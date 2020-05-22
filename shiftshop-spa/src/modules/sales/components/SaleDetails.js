import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {FormattedDate, FormattedMessage, FormattedTime} from 'react-intl';
import {Box, Divider, Grid} from '@material-ui/core';

import useStyles from '../styles/SaleDetails';
import {ProfitChip} from '../../common';

const RowItem = ({label, content, selected}) => {
    const classes = useStyles();

    return (
        <Grid className={selected ? classes.gridRowSelected : classes.gridRow} container item spacing={1} alignItems="center">
            <Grid item xs={12} sm={4} lg={3}>
                <Box fontWeight={500} fontSize="body1.fontSize" fontStyle="italic">
                    <FormattedMessage id={label}/>
                </Box>
            </Grid>
            <Grid className={classes.rowContent} item xs>
                <Box fontSize="body1.fontSize">
                    {content}
                </Box>
            </Grid>
        </Grid>
    );
};

const SaleDetails = ({sale}) => (
    <Grid container>
        <RowItem label="project.global.field.barcode" content={<Box fontFamily="Menlo,Arial">{sale.barcode}</Box>}/>
        {(sale.discount > 0) && <Fragment>
            <RowItem label="project.global.field.subtotal" selected
                     content={<Box>{(sale.total + sale.discount).toFixed(2)} €</Box>}/>
            <RowItem label="project.global.field.discount"
                     content={<Box>{sale.discount.toFixed(2)} €</Box>}/>
        </Fragment>}
        <RowItem label="project.global.field.total" selected
                 content={<Box display="flex" alignItems="center">
                     {sale.total.toFixed(2) + ' €'}
                     &nbsp;
                     <ProfitChip profit={(sale.total - sale.cost)}/>
                 </Box>}/>
        <RowItem label="project.global.field.cost"
                 content={<Box>{sale.cost.toFixed(2)} €</Box>}/>
        {sale.cash && <Fragment>
            <RowItem label="project.global.field.cash" selected
                     content={<Box>{sale.cash.toFixed(2)} €</Box>}/>
            <RowItem label="project.global.field.change"
                     content={<Box>{(sale.cash - sale.total).toFixed(2)} €</Box>}/>
            <Divider/>
        </Fragment>}
        <RowItem label="project.global.field.date" selected
                 content={<Box display="block">
                     <FormattedDate value={sale.date}/>
                     &nbsp;-&nbsp;
                     <FormattedTime value={sale.date} hour="numeric"
                                    minute="numeric" second="numeric"/>
                 </Box>}/>
        <RowItem label="project.global.field.seller" content={sale.seller}/>
    </Grid>
);

SaleDetails.propTypes = {
    sale: PropTypes.object.isRequired
};

export default SaleDetails;
