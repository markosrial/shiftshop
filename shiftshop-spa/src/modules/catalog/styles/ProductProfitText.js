import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    positive: {
        color: theme.palette.success.main,
        fontWeight: 500
    },
    neutral: {
        color: theme.palette.primary.main,
        fontWeight: 500
    },
    negative: {
        color: theme.palette.error.main,
        fontWeight: 500
    }
}));

export default useStyles;
