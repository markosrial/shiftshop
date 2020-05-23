import React from 'react';
import {useSelector} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {Link} from 'react-router-dom';
import {Avatar, Box, Card, Chip, CircularProgress, List, ListItem, ListItemText, Typography} from '@material-ui/core';
import {AttachMoney} from '@material-ui/icons';

import useStyles from '../styles/ProfitableProducts';

import * as selectors from '../selectors';

const BestSellingProducts = () => {

    const classes = useStyles();

    const topProfitable = useSelector(selectors.getTopProfitable);

    return (
        <Card className={classes.root}>
            <Box>
                <Typography className={classes.title} variant="body2">
                    <FormattedMessage id="project.sales.ProfitableProducts.title"/>
                </Typography>
                <Box className={classes.details} mt={1}>
                    {topProfitable
                        ? <List>
                            {topProfitable.map(item => (
                                <ListItem key={item.productId} className={classes.listItem}>
                                    <ListItemText primary={
                                        <Link to={`/catalog/products/${item.productId}`}>
                                            <Box color="light.main" fontSize="subtitle1.fontSize">{item.productName}</Box>
                                        </Link>} secondary={
                                        <Chip component="span" className={classes.chip} size="small"
                                              label={<Box component="span">{item.profit.toFixed(2)} €</Box>}/>
                                    }/>
                                </ListItem>
                            ))}
                        </List>
                        : <CircularProgress size={24}/>}
                </Box>
            </Box>
            <Avatar className={classes.avatar} color="inherit">
                <AttachMoney/>
            </Avatar>
        </Card>
    );
};

export default BestSellingProducts;
