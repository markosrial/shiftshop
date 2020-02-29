import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    card: {marginBottom: theme.spacing(1)},
    header: {
        backgroundColor: theme.palette.light.main,
        padding: theme.spacing(1, 2),
    },
    content: {
        padding: theme.spacing(1, 2),
        paddingBottom: `${theme.spacing(1)}px !important`
    },
    label: {
        marginRight: theme.spacing(2),
        fontStyle: "italic",
        fontWeight: 500
    }
}));

export default useStyles;
