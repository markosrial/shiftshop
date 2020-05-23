import React, {Fragment} from 'react';
import {useHistory} from 'react-router-dom';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
import {Box, Button, Card, CardActions, CardContent, CardHeader, Chip, Divider, Typography} from '@material-ui/core';

import {notFound} from '../../../assets/images';
import useStyles from '../styles/SaleResult';

import * as formulas from '../../../utils/formulas';
import {ProfitText} from '../../common';
import SaleDetails from './SaleDetails';
import SaleItemDetails from './SaleItemDetails';

const SaleResult = ({sale}) => {

    const classes = useStyles();

    const {items, ...saleDetails} = sale;

    const history = useHistory();

    if (!sale) {
        return (
            <div className={classes.emptyPlaceholder}>
                <img className={classes.image} src={notFound} alt="No product"/>
                <Typography className={classes.emptyText} variant="subtitle1">
                    <FormattedMessage id="project.sales.SaleResult.notFound"/>
                </Typography>
                <Button className={classes.backToSaleRecords} variant="outlined"
                        onClick={() => history.push('/sales/records')}>
                    <FormattedMessage id="project.sales.SaleResult.backToSaleRecords"/>
                </Button>
            </div>
        );
    }

    return (
        <Fragment>
            <Card>
                <CardHeader title={<FormattedMessage id="project.sales.SaleResult.details.title"/>}/>
                <Divider/>
                <CardContent style={{padding: 0}}>
                    <SaleDetails sale={saleDetails}/>
                </CardContent>
                <Divider/>
                <CardActions>
                    <ProfitText profit={formulas.getROI(sale.total, sale.cost)} isROI/>
                </CardActions>
            </Card>
            <Box my={2}/>
            <Card>
                <CardHeader title={<Box>
                        <FormattedMessage id="project.sales.SaleResult.items.title"/>
                        &nbsp;
                        <Chip color="primary" size="small" label={items.length}/>
                    </Box>}/>
                <Divider/>
                <CardContent>
                    <SaleItemDetails items={items}/>
                </CardContent>
            </Card>
        </Fragment>
    );

};

SaleResult.propTypes = {
    sale: PropTypes.object
};

export default SaleResult;
