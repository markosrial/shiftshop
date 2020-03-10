import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    active: {
        fontWeight: 500,
        color: theme.palette.primary.main
    },
    inactive: {
        fontWeight: 500,
        color: theme.palette.secondary.main
    },
    statusBadge: { marginLeft: theme.spacing(1) },
    statusMessage: { marginLeft: theme.spacing(2) }
}));

export default useStyles;
