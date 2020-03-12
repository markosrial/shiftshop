import React, {Fragment, useState} from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
import {Button, Card, CardActions, CardContent, CardHeader, Divider, IconButton, Typography} from '@material-ui/core';
import {Edit} from '@material-ui/icons';

import {notFound} from '../../../assets/images';
import useStyles from '../styles/ProductResult';

import {formulas} from '../../../utils'
import users, {Role} from '../../users';
import ProductDetails from './ProductDetails';
import EditProduct from './EditProduct';
import ProductProfitText from './ProductProfitText';

const ProductResult = ({product}) => {
    const classes = useStyles();

    const user = useSelector(users.selectors.getUser);
    const hasRole = roles => users.selectors.hasRole(user, roles);

    const [open, setOpen] = useState(false);

    const history = useHistory();

    if (!product) {
        return (
            <div className={classes.emptyPlaceholder}>
                <img className={classes.image} src={notFound} alt="No product"/>
                <Typography className={classes.emptyText} variant="subtitle1">
                    <FormattedMessage id="project.catalog.ProductResult.notFound"/>
                </Typography>
                <Button className={classes.backToProducts} variant="outlined"
                        onClick={() => history.push('/catalog/products')}>
                    <FormattedMessage id="project.catalog.ProductResult.backToProducts"/>
                </Button>
            </div>
        );
    }

    return (
        <Card>
            <CardHeader title={<FormattedMessage id="project.catalog.Product.title"/>}
                        action={hasRole([Role.ADMIN])
                            && <IconButton className={classes.editButton} size="medium"
                                           onClick={() => setOpen(true)}>
                                <Edit/>
                            </IconButton>}/>
            <Divider/>
            <CardContent>
                <ProductDetails product={product}/>
            </CardContent>
            {hasRole([Role.MANAGER, Role.ADMIN]) &&
                <Fragment>
                    <Divider/>
                    <CardActions>
                        <ProductProfitText profit={formulas.getROI(product.salePrice, product.providerPrice)} isROI/>
                    </CardActions>
                </Fragment>}
            {open && <EditProduct product={product} onClose={() => setOpen(false)}/>}
        </Card>
    );

};

ProductResult.propTypes = {
    product: PropTypes.object
};

export default ProductResult;
