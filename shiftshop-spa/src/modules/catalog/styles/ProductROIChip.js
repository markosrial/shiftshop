import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    positive: {
        backgroundColor: theme.palette.success.main,
        color: theme.palette.success.contrastText,
        fontWeight: 500,
        paddingRight: theme.spacing(1)
    },
    neutral: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        fontWeight: 500,
        paddingRight: theme.spacing(1)
    },
    negative: {
        backgroundColor: theme.palette.error.main,
        color: theme.palette.error.contrastText,
        fontWeight: 500,
        paddingRight: theme.spacing(1)
    }
}));

export default useStyles;
