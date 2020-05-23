import React from 'react';
import {Box, Card, Typography} from '@material-ui/core';

import useStyles from '../styles/MonthResumeCard';

const MonthResumeCard = ({title, content, icon}) => {

    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <Box>
                <Typography className={classes.title} variant="body2">
                    {title}
                </Typography>
                <Box className={classes.details}>
                    {content}
                </Box>
            </Box>
            {icon}
        </Card>
    );

}

export default MonthResumeCard;
