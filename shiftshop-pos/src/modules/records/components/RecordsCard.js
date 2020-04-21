import React, {Fragment} from 'react';
import {useSelector} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {Box, Card, CardActions, CardContent, CardHeader, Chip, Divider, LinearProgress} from '@material-ui/core';

import useStyles from '../styles/RecordsTable';

import * as selectors from '../selectors';
import Records from './Records';

const RecordsCard = ({loading}) => {

    const classes = useStyles();

    const records = useSelector(selectors.getSalesRecords);

    return (
        <Card className={classes.card}>
            <CardHeader title={<FormattedMessage id="project.records.RecordsTable.title"/>}/>
            <Divider/>
            <CardContent className={classes.cardContent}>
                {loading
                    ? <LinearProgress variant="indeterminate"/>
                    : <Records records={records}/>}
            </CardContent>
            {(records.length > 0) &&
                <Fragment>
                    <Divider/>
                    <CardActions>
                        <Box flexGrow={1}/>
                        <Chip color="primary" label={
                            <Box fontWeight={500} fontSize="subtitle2.fontSize">
                                <FormattedMessage id="project.global.field.total"/>:&nbsp;
                                {records.map(sale => sale.total).reduce((a, b) => a + b, 0).toFixed(2)} €
                            </Box>
                        }/>
                    </CardActions>
                </Fragment>
            }
        </Card>
    );

}

export default RecordsCard;
