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
    logoutButton: {
        fontWeight: theme.typography.fontWeightBold,
        marginLeft: theme.spacing(1)
    }
}));

export default useStyles;
