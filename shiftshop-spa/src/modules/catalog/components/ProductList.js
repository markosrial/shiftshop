import React, {Fragment} from 'react';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Chip,
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

import useStyles from '../styles/ProductList';

import * as actions from '../actions';
import * as selectors from '../selectors';

const cardSubheader = (categories, categoryId) =>
    <Box fontStyle="italic" fontWeight="fontWeightMedium" >
        {selectors.getCategoryName(categories, categoryId)}
    </Box>;

const ProductList = ({products, criteria, startSearch, stopSearch}) => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const searchFilter = useSelector(selectors.getSearchFilter);
    const categories = useSelector(selectors.getCategories);

    const handlePrevious = () => {
        startSearch();
        dispatch(actions.previousFindProductsPage({
            ...criteria,
            ...searchFilter,
        }, stopSearch));
    };

    const handleNext = () => {
        startSearch();
        dispatch(actions.nextFindProductsPage({
            ...criteria,
            ...searchFilter,
        }, stopSearch));
    };

    return (
        <Fragment>
            <Hidden xsDown>
                <Paper>
                    <Table size="small" >
                        <TableHead>
                            <TableRow>
                                <TableCell align="left"><FormattedMessage id="project.global.field.name"/></TableCell>
                                <TableCell align="left"><FormattedMessage id="project.global.field.category"/></TableCell>
                                <TableCell align="right"><FormattedMessage id="project.global.field.salePrice.short"/></TableCell>
                                <TableCell align="center"><FormattedMessage id="project.global.field.actions"/></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.items.map(product => (
                                <TableRow key={product.id}>
                                    <TableCell align="left">{product.name}</TableCell>
                                    <TableCell align="left">
                                        <Chip label={selectors.getCategoryName(categories,product.categoryId)} size="small"/>
                                    </TableCell>
                                    <TableCell align="right">{product.salePrice}&nbsp;€</TableCell>
                                    <TableCell align="center">
                                        <IconButton size="small" onClick={() => console.log("hi")}>
                                            <Visibility/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Box display="flex" justifyContent="flex-end">
                        <IconButton size="medium" disabled={criteria.page === 0} onClick={handlePrevious}>
                            <NavigateBefore/>
                        </IconButton>
                        <IconButton size="medium" disabled={!products.existMoreItems} onClick={handleNext}>
                            <NavigateNext/>
                        </IconButton>
                    </Box>
                </Paper>
            </Hidden>
            <Hidden smUp>
                {products.items.map(product => (
                    <Card key={product.id} className={classes.card}>
                        <CardHeader className={classes.header} title={product.name}
                                    subheader={cardSubheader(categories, product.categoryId)}
                                    action={<IconButton><Visibility/></IconButton>}/>
                        <Divider/>
                        <CardContent className={classes.content}>
                            <Box display="flex">
                                <Typography className={classes.label} variant="body1">
                                    <FormattedMessage id="project.global.field.salePrice"/>:
                                </Typography>
                                <Box flexGrow={4}>
                                    {product.salePrice}&nbsp;€
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                ))}
                <Box display="flex" justifyContent="flex-end">
                    <IconButton size="medium" disabled={criteria.page === 0} onClick={handlePrevious}>
                        <NavigateBefore/>
                    </IconButton>
                    <IconButton size="medium" disabled={!products.existMoreItems} onClick={handleNext}>
                        <NavigateNext/>
                    </IconButton>
                </Box>
            </Hidden>
        </Fragment>
    );
};

ProductList.propTypes = {
    products: PropTypes.object.isRequired,
    criteria: PropTypes.object.isRequired
};

export default ProductList;