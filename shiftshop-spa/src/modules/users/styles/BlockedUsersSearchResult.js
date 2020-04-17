import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
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
    backButton: {marginTop: theme.spacing(2)},
}));

export default useStyles;
