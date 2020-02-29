import {colors, makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    drawer: {
        minWidth: theme.spacing(30),
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflowY: 'auto',
        padding: theme.spacing(2),
    },
    header: {marginBottom: theme.spacing(3)},
    filters: {flexGrow: 1},
    section: {marginBottom: theme.spacing(3)},
    subTitle: {
        color: colors.blueGrey[500],
        fontSize: '0.8rem',
        fontWeight: theme.typography.fontWeightBold,
        textTransform: 'uppercase',
        marginBottom: theme.spacing(1),
    },
    actionButton: {marginTop: theme.spacing(1)}
}));

export default useStyles;
