import {colors, makeStyles} from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
    root: {
        minHeight: '100%',
        backgroundImage: `linear-gradient(315deg, ${colors.deepPurple[400]} 0%, ${colors.indigo[800]} 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(6, 2),
    },
    card: {
        width: theme.breakpoints.values.md,
        maxWidth: '100%',
        overflow: 'unset',
        display: 'flex',
        position: 'relative',
        '& > *': {
            flexGrow: 1,
            flexBasis: '50%',
            width: '50%'
        }
    },
    content: {padding: theme.spacing(8, 3, 8, 3)},
    brand: {
        fontFamily: 'Righteous',
        color: theme.palette.primary.dark
    },
    brandChip: {
        marginLeft: theme.spacing(1),
        fontWeight: 700
    },
    media: {
        backgroundColor: colors.indigo[400],
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        minHeight: '400px',
        width: 'auto',
    },
    icon: {
        backgroundColor: colors.green[400],
        color: theme.palette.white,
        borderRadius: '100%',
        padding: theme.spacing(1),
        position: 'absolute',
        top: -32,
        left: theme.spacing(3),
        height: 64,
        width: 64,
        fontSize: 24
    },
    divider: {margin: theme.spacing(3, 0)},
}));
