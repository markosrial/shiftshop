import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    form: {
        [theme.breakpoints.up('sm')]:{
            display: 'flex'
        },
    },
    categorySelect: {
        flex: '1',
        [theme.breakpoints.up('sm')]: {
            '& fieldset': {
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
            },
        },
    },
    searchText: {
        flex: '2',
        [theme.breakpoints.up('sm')]: {
            '& fieldset': {
                borderRadius: 0,
            },
        },
    },
    searchButton: {
        flex: '0',
        height: theme.spacing(5),
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(0),
        boxShadow: 'none !important',
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        },
        [theme.breakpoints.up('sm')]: {
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
        },
    },
}));

export default useStyles;
