import {colors, makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        color: theme.palette.light.contrastText,
        padding: theme.spacing(3),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        textTransform: 'uppercase',
        fontWeight: 700
    },
    details: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    avatar: {
        backgroundImage: `linear-gradient(180deg, ${colors.red[300]} 0%, ${colors.red[800]} 100%)`,
        height: 48,
        width: 48
    },
    listItem: {
        paddingLeft: theme.spacing(0),
        paddingRight: theme.spacing(0),
        paddingBottom: theme.spacing(0),
    },
    chip: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        fontWeight: 500
    }
}));

export default useStyles;
