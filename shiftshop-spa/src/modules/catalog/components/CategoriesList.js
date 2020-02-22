import React, {Fragment} from 'react';
import {useSelector} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {Card, CardContent, CardHeader, Divider, List, Typography} from '@material-ui/core';

import useStyles from '../styles/CategoriesList';
import {emptyPlaceholder} from '../../../assets/images';

import CategoriesListItem from './CategoriesListItem';

import * as selectors from '../selectors';

const CategoriesList = () => {
    const classes = useStyles();

    const categories = useSelector(selectors.getCategories);

    return (
        <Card>
            <CardHeader title={<FormattedMessage id="project.catalog.CategoriesList.title"/>}/>
            <Divider/>
            <CardContent className={classes.content}>
                {categories.length > 0
                    ? <List className={classes.list}>
                        {categories.map((category) =>
                            (<Fragment key={category.id}>
                                <Divider/>
                                <CategoriesListItem category={category}/>
                            </Fragment>))}
                    </List>
                    : <div className={classes.emptyPlaceholder}>
                        <img className={classes.image} src={emptyPlaceholder} alt="No items"/>
                        <Typography className={classes.emptyText} variant="subtitle2">
                            <FormattedMessage id="project.catalog.CategoriesList.emptyCategories"/>
                        </Typography>
                    </div>
                }
            </CardContent>
        </Card>
    );
};

export default CategoriesList;