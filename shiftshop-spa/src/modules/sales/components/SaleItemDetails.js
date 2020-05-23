import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
import {Link} from 'react-router-dom';
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Hidden,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Tooltip,
    Typography
} from '@material-ui/core';

import useStyles from '../styles/SaleItemDetails';
import {ProfitChip} from '../../common';

const SaleItemDetailsTable = ({items}) => (
    <Paper style={{overflow: 'hidden'}}>
        <Box  style={{ overflow: 'auto'}}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell align="left"><FormattedMessage id="project.global.field.name"/></TableCell>
                        <TableCell align="right"><FormattedMessage id="project.global.field.salePrice"/></TableCell>
                        <TableCell align="right"><FormattedMessage id="project.global.field.quantity"/></TableCell>
                        <TableCell align="right"><FormattedMessage id="project.global.field.total"/></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map(item => (
                        <TableRow key={item.id}>
                            <TableCell align="left">
                                <Link to={`/catalog/products/${item.productId}`}>
                                    <Box color="primary.dark">{item.productName}</Box>
                                </Link>
                            </TableCell>
                            <TableCell align="right">
                                <Box display="inline">{item.salePrice.toFixed(2)}&nbsp;€</Box>
                            </TableCell>
                            <TableCell align="right">
                                x{item.quantity}
                            </TableCell>
                            <TableCell align="right">
                                <Tooltip enterDelay={600} title={<Box fontSize="body2.fontSize">
                                            <FormattedMessage id="project.global.field.profit"/>:&nbsp;
                                            {((item.salePrice-item.cost) * item.quantity).toFixed(2)}&nbsp;€
                                         </Box>}>
                                    <Box>{(item.salePrice * item.quantity).toFixed(2)}&nbsp;€</Box>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    </Paper>
);


const SaleItemDetailsCards = ({items}) => {

    const classes = useStyles();

    return (
        <Fragment>
            {items.map(item => (
                <Card key={item.id} className={classes.card}>
                    <CardHeader className={classes.header}
                                title={<Link to={`/catalog/products/${item.productId}`}>{item.productName}</Link>}/>
                    <Divider/>
                    <CardContent className={classes.content}>
                        <Box display="flex" alignItems="center">
                            <Typography className={classes.label} variant="body1">
                                <FormattedMessage id="project.global.field.salePrice"/>:
                            </Typography>
                            <Box flexGrow={4} fontSize="body1.fontSize">{item.salePrice.toFixed(2)}&nbsp;€</Box>
                        </Box>
                        <Box display="flex" alignItems="center">
                            <Typography className={classes.label} variant="body1">
                                <FormattedMessage id="project.global.field.quantity"/>:
                            </Typography>
                            <Box flexGrow={4} fontSize="body1.fontSize">x{item.quantity}</Box>
                        </Box>
                        <Box display="flex" alignItems="center">
                            <Typography className={classes.label} variant="body1">
                                <FormattedMessage id="project.global.field.total"/>:
                            </Typography>
                            <Box flexGrow={4}>
                                <Box fontSize="body1.fontSize">
                                    {(item.salePrice * item.quantity).toFixed(2)}
                                    &nbsp;€&nbsp;
                                    <ProfitChip profit={((item.salePrice - item.cost) * item.quantity)}/>
                                </Box>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            ))}
        </Fragment>
    );

}

const SaleItemDetails = ({items}) => (
    <Fragment>
        <Hidden xsDown>
            <SaleItemDetailsTable items={items}/>
        </Hidden>
        <Hidden smUp>
            <SaleItemDetailsCards items={items}/>
        </Hidden>
    </Fragment>
);

SaleItemDetails.propTypes = {
    items: PropTypes.array.isRequired
};

export default SaleItemDetails;
