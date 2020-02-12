import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {MuiThemeProvider} from '@material-ui/core';
import {SnackbarProvider} from 'notistack';
import {IntlProvider} from 'react-intl';

/* Async/await regenerator necesaries */
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import './assets/scss/index.scss';
import theme from './theme'

import {App} from './modules/app';

import configureStore from './store';
import {initReactIntl} from "./i18n";
import './polyfills';

/* Configure store. */
const store = configureStore();

/* Configure i18n. */
const {locale, messages} = initReactIntl();

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <IntlProvider locale={locale} messages={messages}>
          <SnackbarProvider anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                            autoHideDuration={2500}>
            <App/>
          </SnackbarProvider>
        </IntlProvider>
      </Provider>
    </MuiThemeProvider>,
    document.getElementById("root"));
