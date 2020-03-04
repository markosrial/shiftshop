import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    emptyPlaceholder: {
        padding: theme.spacing(1),
        textAlign: 'center'
    },
    image: {
        maxWidth: '100%',
        [theme.breakpoints.down('sm')]: {maxHeight: '20rem'},
        [theme.breakpoints.up('md')]: {maxHeight: '25rem',},
    },
    emptyText: {
        fontStyle: 'italic',
        fontWeight: 500
    },
    backToProducts: {marginTop: theme.spacing(2)}
}));

export default useStyles;
