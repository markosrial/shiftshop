import {colors, makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    item: {
        paddingTop: 0,
        paddingBottom: 0
    },
    button: {
        color: colors.blueGrey[900],
        padding: theme.spacing(1),
        justifyContent: 'flex-start',
        textTransform: 'none',
        fontSize: '0.9rem',
    },
    icon: {
        color: theme.palette.icon,
        display: 'flex',
        alignItems: 'center',
        marginRight: theme.spacing(1)
    },
    textNoIcon: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(4)
    },
    label: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: 'auto'
    },
    buttonActive: {
        color: theme.palette.primary.main,
        padding: theme.spacing(1),
        fontSize: '0.9rem',
        fontWeight: theme.typography.fontWeightBold,
        justifyContent: 'flex-start',
        textTransform: 'none',
        '& $icon': {color: theme.palette.primary.main}
    }
}));

export default useStyles;
