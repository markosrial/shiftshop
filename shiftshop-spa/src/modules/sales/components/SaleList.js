import React, {Fragment} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FormattedDate, FormattedMessage, FormattedTime} from 'react-intl';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {useSnackbar} from 'notistack';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Hidden,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from '@material-ui/core';
import {NavigateBefore, NavigateNext, Visibility} from '@material-ui/icons';

import useStyles from '../styles/SaleList';

import * as actions from '../actions';
import * as selectors from '../selectors';
import {ErrorContent} from '../../common';

const SaleListTable = ({sales, criteria, saleDetails, previous, next}) => {

    return (
        <Paper style={{overflow: 'hidden'}}>
            <Box  style={{ overflow: 'auto'}}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left"><FormattedMessage id="project.global.field.barcode"/></TableCell>
                            <TableCell align="center"><FormattedMessage id="project.global.field.date"/></TableCell>
                            <TableCell align="right"><FormattedMessage id="project.global.field.total"/></TableCell>
                            <Hidden mdDown>
                                <TableCell align="center"><FormattedMessage id="project.global.field.seller"/></TableCell>
                            </Hidden>
                            <TableCell align="center"><FormattedMessage id="project.global.field.actions"/></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sales.items.map(sale => (
                            <TableRow key={sale.barcode}>
                                <TableCell align="left">
                                    <Link to={`/sales/records/${sale.barcode}`}>
                                        <Box fontFamily="Menlo,Arial" color="primary.dark">{sale.barcode}</Box>
                                    </Link>
                                </TableCell>
                                <TableCell align="center">
                                    <Box>
                                        <Box><FormattedDate value={sale.date}/></Box>
                                        <Box><FormattedTime value={sale.date} hour="numeric" minute="numeric" second="numeric" /></Box>
                                    </Box>
                                </TableCell>
                                <TableCell align="right">{sale.total}&nbsp;€</TableCell>
                                <Hidden mdDown>
                                    <TableCell align="center">{sale.seller}</TableCell>
                                </Hidden>
                                <TableCell align="center">
                                    <IconButton size="small" onClick={saleDetails(sale.barcode)}>
                                        <Visibility/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
            <Box display="flex" justifyContent="flex-end">
                <IconButton size="medium" disabled={criteria.page === 0} onClick={previous}>
                    <NavigateBefore/>
                </IconButton>
                <IconButton size="medium" disabled={!sales.existMoreItems} onClick={next}>
                    <NavigateNext/>
                </IconButton>
            </Box>
        </Paper>
    );

}


const SaleListCards = ({sales, criteria, previous, next}) => {

    const classes = useStyles();

    return (
        <Fragment>
            {sales.items.map(sale => (
                <Card key={sale.barcode} className={classes.card}>
                    <CardHeader className={classes.header}
                                title={<Link to={`/sales/records/${sale.barcode}`}>
                                    <Box fontFamily="Menlo,Arial">{sale.barcode}</Box>
                                </Link>}
                                subheader={
                                    <Box>
                                        <FormattedTime value={sale.date} hour="numeric" minute="numeric" second="numeric" />
                                        &nbsp;-&nbsp;
                                        <FormattedDate value={sale.date}/>
                                    </Box>
                                }/>
                    <Divider/>
                    <CardContent className={classes.content}>
                        <Box display="flex">
                            <Typography className={classes.label} variant="body1">
                                <FormattedMessage id="project.global.field.total"/>:
                            </Typography>
                            <Box flexGrow={4}>{sale.total}&nbsp;€</Box>
                        </Box>
                        <Box display="flex">
                            <Typography className={classes.label} variant="body1">
                                <FormattedMessage id="project.global.field.seller"/>:
                            </Typography>
                            <Box flexGrow={4}>{sale.seller}</Box>
                        </Box>
                    </CardContent>
                </Card>
            ))}
            <Box display="flex" justifyContent="flex-end">
                <IconButton size="medium" disabled={criteria.page === 0} onClick={previous}>
                    <NavigateBefore/>
                </IconButton>
                <IconButton size="medium" disabled={!sales.existMoreItems} onClick={next}>
                    <NavigateNext/>
                </IconButton>
            </Box>
        </Fragment>
    );

}

const SaleList = ({sales, criteria, startSearch, stopSearch}) => {

    const {enqueueSnackbar, closeSnackbar} = useSnackbar();

    const dispatch = useDispatch();

    const searchFilter = useSelector(selectors.getSearchFilter);

    const history = useHistory();

    const saleDetails = barcode => () => history.push(`/sales/records/${barcode}`);

    const handlePrevious = () => {
        startSearch();
        dispatch(actions.previousFindSalesPage(
            {...criteria, ...searchFilter},
            errors => enqueueSnackbar(<ErrorContent errors={errors}/>,
                {variant: 'error', persist: 'true',
                    action: key => (<Button color="inherit" variant="outlined" onClick={() => closeSnackbar(key)}>
                        <FormattedMessage id="project.global.button.close"/>
                    </Button>)}),
            stopSearch));
    };

    const handleNext = () => {
        startSearch();
        dispatch(actions.nextFindSalesPage(
            {...criteria, ...searchFilter},
            errors => enqueueSnackbar(<ErrorContent errors={errors}/>,
                {variant: 'error', persist: 'true',
                    action: key => (<Button color="inherit" variant="outlined" onClick={() => closeSnackbar(key)}>
                        <FormattedMessage id="project.global.button.close"/>
                    </Button>)}),
            stopSearch));
    };

    return (
        <Fragment>
            <Hidden xsDown>
                <SaleListTable sales={sales} criteria={criteria} saleDetails={saleDetails}
                               previous={handlePrevious} next={handleNext}/>
            </Hidden>
            <Hidden smUp>
                <SaleListCards sales={sales} criteria={criteria}
                               previous={handlePrevious} next={handleNext}/>
            </Hidden>
        </Fragment>
    );

};

SaleList.propTypes = {
    sales: PropTypes.object.isRequired,
    criteria: PropTypes.object.isRequired
};

export default SaleList;
