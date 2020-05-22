import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import {Avatar, Box, Card, Chip, CircularProgress, List, ListItem, ListItemText, Typography} from '@material-ui/core';
import {Whatshot} from '@material-ui/icons';

import useStyles from '../styles/BestSellingProducts';

import * as selectors from '../selectors';

const BestSellingProducts = () => {

    const classes = useStyles();

    const topBestSelling = useSelector(selectors.getTopBestSelling);

    return (
        <Card className={classes.root}>
            <Box>
                <Typography className={classes.title} variant="body2">
                    <FormattedMessage id="project.sales.BestSellingProducts.title"/>
                </Typography>
                <Box className={classes.details} mt={1}>
                    {topBestSelling
                        ? <List>
                            {topBestSelling.map(item => (
                                <ListItem key={item.productId} className={classes.listItem}>
                                    <ListItemText primary={
                                        <Link to={`/catalog/products/${item.productId}`}>
                                            <Box fontSize="subtitle1.fontSize">{item.productName}</Box>
                                        </Link>} secondary={
                                        <Chip component="span" className={classes.chip} size="small"
                                              label={<Box component="span">
                                                  {item.quantity}&nbsp;
                                                  <FormattedMessage id="project.global.field.units.short"/>
                                              </Box>}/>}/>
                                </ListItem>
                            ))}
                        </List>
                        : <CircularProgress size={24}/>}
                </Box>
            </Box>
            <Avatar className={classes.avatar} color="inherit">
                <Whatshot/>
            </Avatar>
        </Card>
    );
};

export default BestSellingProducts;
