import React from 'react';
import {Line} from 'react-chartjs-2';

import * as selectors from '../selectors';
import {useSelector} from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import {fade, useTheme} from '@material-ui/core';
import {FormattedMessage, useIntl} from 'react-intl';

const useStyles = makeStyles(theme => ({
    root: {},
    content: {overflow: 'auto'},
    buttons: {
        display: 'flex',
        justifyContent: 'center',
        '& > *': {
            marginLeft: theme.spacing(1)
        }
    },
    inner: {
        height: 300,
        minWidth: 400
    },
}));

const YearSalesChart = ({yearData}) => {

    const theme = useTheme();
    const intl = useIntl();

    const labels = [
        intl.formatMessage({id: 'project.global.month.january.short'}),
        intl.formatMessage({id: 'project.global.month.february.short'}),
        intl.formatMessage({id: 'project.global.month.march.short'}),
        intl.formatMessage({id: 'project.global.month.april.short'}),
        intl.formatMessage({id: 'project.global.month.may.short'}),
        intl.formatMessage({id: 'project.global.month.june.short'}),
        intl.formatMessage({id: 'project.global.month.july.short'}),
        intl.formatMessage({id: 'project.global.month.august.short'}),
        intl.formatMessage({id: 'project.global.month.september.short'}),
        intl.formatMessage({id: 'project.global.month.october.short'}),
        intl.formatMessage({id: 'project.global.month.november.short'}),
        intl.formatMessage({id: 'project.global.month.december.short'})
    ];

    const yearDataValues = records => {

        let billed = new Array(12).fill(null);
        let profit = new Array(12).fill(null);

        records.forEach(monthData => {
            billed[monthData.month - 1] = monthData.total;
            profit[monthData.month - 1] = monthData.profit;
        });

        return {billed, profit};

    }

    const data = canvas => {

        const ctx = canvas.getContext('2d');
        const dataValues = yearDataValues(yearData);

        const gradientBilled = ctx.createLinearGradient(0, 0, 0, 300);
        gradientBilled.addColorStop(0, fade(theme.palette.primary.main, 0.2));
        gradientBilled.addColorStop(0.9, 'rgba(255,255,255,0)');
        gradientBilled.addColorStop(1, 'rgba(255,255,255,0)');

        const gradientProfit = ctx.createLinearGradient(0, 0, 0, 300);
        gradientProfit.addColorStop(0, fade(theme.palette.success.main, 0.2));
        gradientProfit.addColorStop(0.9, 'rgba(255,255,255,0)');
        gradientProfit.addColorStop(1, 'rgba(255,255,255,0)');

        console.log(dataValues.billed);
        console.log(dataValues.profit);


        return {
            datasets: [
                {
                    data: dataValues.billed,
                    label: 'billed',
                    backgroundColor: gradientBilled,
                    borderColor: theme.palette.primary.light,
                    pointBorderColor: '#FFFFFF',
                    pointBorderWidth: 3,
                    pointRadius: 6,
                    pointBackgroundColor: theme.palette.primary.light
                },
                {
                    data: dataValues.profit,
                    label: 'profit',
                    backgroundColor: gradientProfit,
                    borderColor: theme.palette.success.light,
                    pointBorderColor: '#FFFFFF',
                    pointBorderWidth: 3,
                    pointRadius: 6,
                    pointBackgroundColor: theme.palette.success.light
                }
            ],
            labels
        };

    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        legend: {
            display: false
        },
        layout: {
            padding: 0
        },
        scales: {
            xAxes: [
                {
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        padding: 20,
                        fontColor: theme.palette.text.secondary
                    }
                }
            ],
            yAxes: [
                {
                    gridLines: {
                        borderDash: [2],
                        borderDashOffset: [2],
                        color: theme.palette.divider,
                        drawBorder: false,
                        zeroLineBorderDash: [2],
                        zeroLineBorderDashOffset: [2],
                        zeroLineColor: theme.palette.divider
                    },
                    ticks: {
                        padding: 20,
                        fontColor: theme.palette.text.secondary,
                        beginAtZero: true,
                        min: 0,
                        maxTicksLimit: 10,
                        callback: value => value + ' €'
                    }
                }
            ]
        },
        tooltips: {
            enabled: true,
            mode: 'index',
            intersect: false,
            caretSize: 10,
            yPadding: 20,
            xPadding: 20,
            borderWidth: 1,
            borderColor: theme.palette.divider,
            backgroundColor: theme.palette.white,
            titleFontColor: theme.palette.text.primary,
            bodyFontColor: theme.palette.text.secondary,
            footerFontColor: theme.palette.text.secondary,
            callbacks: {
                title: () => {},
                label: tooltipItem => {

                    let label;

                    switch (tooltipItem.datasetIndex) {
                        case 0:
                            label = intl.formatMessage({id: 'project.global.field.billed'});
                            break;
                        case 1:
                            label = intl.formatMessage({id: 'project.global.field.profit'});
                            break;
                        default:
                            label = "";
                            break;

                    };

                    label += ` ${tooltipItem.yLabel.toFixed(2)} €`;

                    return label;
                }
            }
        }
    };

    return (
        <Box width={1} height={1} style={{position: 'relative'}}>
            <Line data={data} options={options}/>
        </Box>
    );
}

const YearSalesResume = () => {
    const classes = useStyles();
    const yearSalesResume = useSelector(selectors.getYearSalesResume);

    return (
        <Card className={classes.root}>
            <CardHeader title={<FormattedMessage id="project.sales.YearSalesResumeCard.title"/>}/>
            <Divider />
            <CardContent className={classes.content}>
                <Box>
                    <div className={classes.inner}>
                        {yearSalesResume
                            ? <YearSalesChart yearData={yearSalesResume}/>
                            : <Box width={1} height={1} display="flex"
                                   alignItems="center" justifyContent="center">
                                <CircularProgress size={48}/>
                            </Box>}
                    </div>
                </Box>
            </CardContent>
        </Card>
    );

}

export default YearSalesResume;
