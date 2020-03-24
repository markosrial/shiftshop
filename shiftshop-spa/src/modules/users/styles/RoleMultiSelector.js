import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    placeholder: {
        fontStyle: 'italic',
        color: theme.palette.grey.dark
    },
    managerChip: {
        backgroundColor: theme.palette.dark.main,
        color: theme.palette.dark.contrastText,
        fontWeight: 700
    },
    adminChip: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        fontWeight: 700
    },
    salesmanChip: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
        fontWeight: 700
    },
    undefinedChip: {
        backgroundColor: theme.palette.error.main,
        color: theme.palette.error.contrastText,
        fontWeight: 700
    }
}));

export default useStyles;
