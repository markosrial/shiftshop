import {colors, makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    item: {
        display: 'block',
        paddingTop: 0,
        paddingBottom: 0
    },
    button: {
        color: colors.blueGrey[900],
        padding: theme.spacing(1),
        justifyContent: 'flex-start',
        fontSize: '0.9rem',
        textTransform: 'none',
        width: '100%'
    },
    list: {padding: theme.spacing(0)},
    icon: {
        color: theme.palette.icon,
        display: 'flex',
        alignItems: 'center',
        marginRight: theme.spacing(1)
    },
    expandIcon: {
        marginLeft: 'auto',
        height: theme.spacing(2),
        width: theme.spacing(3)
    },
    active: {
        color: theme.palette.primary.main,
        fontWeight: theme.typography.fontWeightMedium,
        '& $icon': {color: theme.palette.primary.main}
    }
}));

export default useStyles;
