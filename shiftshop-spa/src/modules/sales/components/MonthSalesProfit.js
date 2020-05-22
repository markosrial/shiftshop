import React from 'react';
import {useSelector} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {Box, CircularProgress, makeStyles, Avatar, colors} from '@material-ui/core';
import {TrendingUp} from '@material-ui/icons';

import * as selectors from '../selectors';
import MonthResumeCard from './MonthResumeCard';


const useStyles = makeStyles(theme => ({
    avatar: {
        backgroundImage: `linear-gradient(180deg, ${colors.green[300]} 0%, ${colors.green[800]} 100%)`,
        height: 48,
        width: 48
    }
}));

const MonthSalesProfit = () => {

    const classes = useStyles();

    const monthSalesResume = useSelector(selectors.getMonthSalesResume);

    return (
        <MonthResumeCard title={<FormattedMessage id="project.sales.MonthSalesProfit.title"/>}
                         content={monthSalesResume
                             ? <Box component="h3">{monthSalesResume.profit.toFixed(2)}&nbsp;€</Box>
                             : <CircularProgress size={24}/>}
                         icon={<Avatar className={classes.avatar}><TrendingUp/></Avatar>}
        />
    );
};

export default MonthSalesProfit;
