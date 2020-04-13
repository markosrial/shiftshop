import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    rootBox: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    emptyPlaceholder: {
        padding: theme.spacing(2),
        textAlign: 'center'
    },
    image: {
        maxWidth: '100%',
        maxHeight: '20rem',
    },
    emptyText: {
        marginTop: theme.spacing(1),
        fontStyle: 'italic',
        fontWeight: 500
    },
    tableContainer: {maxHeight: '100%'},
    actions: {boxShadow: 'none'},
    productActionAdd: {
        paddingLeft: theme.spacing(0),
        paddingRight: theme.spacing(0),
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.light,
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
        },
    },
    productActionSubtract: {
        paddingLeft: theme.spacing(0),
        paddingRight: theme.spacing(0),
        color: theme.palette.secondary.contrastText,
        backgroundColor: theme.palette.secondary.light,
        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
        }
    },
    productActionRemove: {
        paddingLeft: theme.spacing(0),
        paddingRight: theme.spacing(0),
        color: theme.palette.dark.contrastText,
        backgroundColor: theme.palette.dark.light,
        '&:hover': {
            backgroundColor: theme.palette.dark.main,
        }
    }
}));

export default useStyles;
