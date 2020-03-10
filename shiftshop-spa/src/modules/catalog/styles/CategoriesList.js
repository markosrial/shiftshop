import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    content: {
        padding: 0,
        paddingBottom: theme.spacing(1) + 'px !important'
    },
    list : {
        padding: 0,
        marginBottom: 0
    },
    emptyPlaceholder: {
        padding: theme.spacing(1),
        textAlign: 'center'
    },
    image: {
        maxWidth: '100%',
        [theme.breakpoints.down('sm')]: {maxHeight: '20rem'},
        [theme.breakpoints.up('md')]: {maxHeight: '25rem',},
    },
    emptyText: {fontStyle: 'italic'}
}));

export default useStyles;
