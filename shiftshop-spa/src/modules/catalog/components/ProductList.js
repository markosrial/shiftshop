import React, {Fragment} from 'react';
import {Link, useHistory} from 'react-router-dom';
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

const cardSubheader = categoryName =>
    <Box fontStyle="italic" fontWeight="fontWeightMedium" >
        {categoryName}
    </Box>;

const ProductList = ({products, criteria, startSearch, stopSearch}) => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const searchFilter = useSelector(selectors.getSearchFilter);
    const categories = useSelector(selectors.getCategories);
    const getCategoryName = id => selectors.getCategoryName(categories, id);

    const history = useHistory();

    const productDetails = id => () => history.push(`/catalog/products/${id}`);

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
                <Paper style={{overflow: 'hidden'}}>
                    <Table size="small" style={{overflow: 'auto'}}>
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
                                    <TableCell align="left">
                                        <Link to={`/catalog/products/${product.id}`}>
                                            <Box color="primary.dark">{product.name}</Box>
                                        </Link>
                                    </TableCell>
                                    <TableCell align="left">
                                        <Chip label={getCategoryName(product.categoryId)} size="small"/>
                                    </TableCell>
                                    <TableCell align="right">{product.salePrice}&nbsp;€</TableCell>
                                    <TableCell align="center">
                                        <IconButton size="small" onClick={productDetails(product.id)}>
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
                        <CardHeader className={classes.header}
                                    title={<Link to={`/catalog/products/${product.id}`}>{product.name}</Link>}
                                    subheader={cardSubheader(getCategoryName(product.categoryId))}
                                    action={<IconButton onClick={productDetails(product.id)}><Visibility/></IconButton>}/>
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
