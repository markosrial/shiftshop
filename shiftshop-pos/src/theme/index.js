import { createMuiTheme } from '@material-ui/core';

import palette from './palette';
import typography from './typography';
import overrides from './overrides';

const theme = locale => createMuiTheme({
  palette,
  typography,
  overrides
}, locale);

export default theme;
