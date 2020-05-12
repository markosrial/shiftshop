import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    spinner: {marginTop: theme.spacing(3),},
    emptyPlaceholder: {
        padding: theme.spacing(1),
        textAlign: 'center'
    },
    imageBox:{padding: theme.spacing(3)},
    image: {
        maxWidth: '100%',
        [theme.breakpoints.down('sm')]: {maxHeight: '15rem'},
        [theme.breakpoints.up('md')]: {maxHeight: '20rem',},
    },
    emptyText: {fontStyle: 'italic'},
    products: {marginTop: theme.spacing(2)}
}));

export default useStyles;
