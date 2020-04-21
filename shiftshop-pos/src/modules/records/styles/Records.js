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
    recordsPaper: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    tableContainer: {
        maxHeight: '100%',
        flexGrow: 1,
    }
}));

export default useStyles;
