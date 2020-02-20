import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    topBar: {
        boxShadow: 'none',
        backgroundColor: theme.palette.primary
    },
    flexGrow: {flexGrow: 1},
    sidebarToggle: {marginRight: theme.spacing(1)},
    brand: {
        fontFamily: 'Righteous',
        color: theme.palette.light.main
    },
    logo: {
        padding: theme.spacing(1),
        maxWidth: '5rem'
    },
    logoutButton: {
        fontWeight: theme.typography.fontWeightBold,
        marginLeft: theme.spacing(1)
    },
    logoutText: {marginLeft: theme.spacing(1)}
}));

export default useStyles;
