import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {MuiThemeProvider} from '@material-ui/core';
import {SnackbarProvider} from 'notistack';
import {IntlProvider} from 'react-intl';

import 'react-app-polyfill/stable';

import './assets/scss/index.scss';
import theme from './theme';

import {App} from './modules/app';

import configureStore from './store';
import {initReactIntl} from "./i18n";
import * as serviceWorker from './serviceWorker';

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
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
