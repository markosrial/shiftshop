import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    positive: {
        backgroundColor: theme.palette.success.main,
        fontWeight: 500,
        color: theme.palette.success.contrastText
    },
    neutral: {
        backgroundColor: theme.palette.primary.main,
        fontWeight: 500,
        color: theme.palette.primary.contrastText
    },
    negative: {
        backgroundColor: theme.palette.error.main,
        fontWeight: 500,
        color: theme.palette.error.contrastText
    }
}));

export default useStyles;
