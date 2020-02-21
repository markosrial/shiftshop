import {colors, makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        padding: '6px 16px',
        borderRadius: theme.shape.borderRadius
    },
    default: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText
    },
    success: {
        backgroundColor: colors.green[600],
        color: theme.palette.white
    },
    info: {
        backgroundColor: colors.lightBlue[600],
        color: theme.palette.white
    },
    warning: {
        backgroundColor: colors.orange[500],
        color: theme.palette.white
    },
    error: {
        backgroundColor: theme.palette.error.main,
        color: theme.palette.error.contrastText
    },
    message: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        padding: '8px 0',
    },
    icon: {
        fontSize: 20,
        marginRight: theme.spacing(1)
    },
    action: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: 'auto',
        paddingLeft: 16,
        marginRight: -8
    }
}));

export default useStyles;
