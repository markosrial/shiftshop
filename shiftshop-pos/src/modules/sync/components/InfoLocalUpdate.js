import React from 'react';
import {useSelector} from 'react-redux';
import {FormattedDate, FormattedMessage, FormattedTime} from 'react-intl';
import {Box, Chip, Typography} from '@material-ui/core';

import {useStyles} from '../styles/InfoLocalUpdate';

import * as selectors from '../selectors';

const InfoLocalUpdate = () => {

    const classes = useStyles();

    const localUpdateTimestamp = useSelector(selectors.getLocalUpdateTimestamp);
    const lastUpdateTimestamp = useSelector(selectors.getLastUpdateTimestamp);

    if (!localUpdateTimestamp && !lastUpdateTimestamp) {
        return (
            <Chip className={classes.noDataChip} label={
                <Typography className={classes.noDataText} variant="body2">
                    <FormattedMessage id="project.sync.InfoLocalUpdate.noSyncAvaliable"/>
                </Typography>
            }/>
        );
    }

    if (!localUpdateTimestamp) {
        return (
            <Chip className={classes.noDataChip} label={
                <Typography className={classes.noDataText} variant="body2">
                    <FormattedMessage id="project.sync.InfoLocalUpdate.noData"/>
                </Typography>
            }/>
        );
    }

    return (
        <Chip color="secondary"
              label={<Box>
                  <Typography className={classes.message} variant="body2">
                      <FormattedMessage id="project.sync.InfoLocalUpdate.lastUpdate"/>:&nbsp;
                      <FormattedDate value={localUpdateTimestamp} year="numeric" month="2-digit" day="2-digit"/>
                      &nbsp;-&nbsp;
                      <FormattedTime value={localUpdateTimestamp} hour="numeric" minute="numeric" second="numeric"/>
                  </Typography>
              </Box>}/>
    );
};

export default InfoLocalUpdate;
