import {colors} from '@material-ui/core';

const black = '#000';
const white = '#FFF';

export default {
  black,
  white,
  primary: {
    contrastText: white,
    dark: '#00228b',
    main: '#414abc',
    light: '#5864ff'
  },
  secondary: {
    contrastText: white,
    dark: '#4B636E',
    main: '#78909C',
    light: '#A7C0CD'
  },
  success: {
    contrastText: white,
    dark: colors.green[900],
    main: colors.green[600],
    light: colors.green[400]
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400]
  },
  warning: {
    contrastText: white,
    dark: colors.orange[900],
    main: colors.orange[600],
    light: colors.orange[400]
  },
  info: {
    contrastText: white,
    dark: colors.lightBlue[900],
    main: colors.lightBlue[600],
    light: colors.lightBlue[400]
  },
  light: {
    contrastText: black,
    dark: '#C7C7C7',
    main: '#F5F5F5',
    light: '#FAFAFA'
  },
  grey: {
    contrastText: white,
    dark: '#4B636E',
    main: '#78909C',
    light: '#A7C0CD'
  },
  dark: {
    contrastText: white,
    dark: '#212121',
    main: '#424242',
    light: '#6D6D6D'
  },
  text: {
    primary: colors.blueGrey[900],
    secondary: colors.blueGrey.A700,
    link: colors.blue[600]
  },
  link: colors.blue[800],
  icon: colors.blueGrey[600],
  background: {
    default: '#F4F4F4',
    paper: white
  },
  divider: colors.grey[200]
};
