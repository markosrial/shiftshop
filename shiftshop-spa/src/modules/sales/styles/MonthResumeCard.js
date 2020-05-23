import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        textTransform: 'uppercase',
        fontWeight: 700,
        marginBottom: theme.spacing(1)
    },
    details: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap'
    }
}));

export default useStyles;
