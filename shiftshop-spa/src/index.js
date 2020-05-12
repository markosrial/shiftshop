import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {SnackbarProvider} from 'notistack';
import {IntlProvider} from 'react-intl';
import {MuiThemeProvider} from '@material-ui/core';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';

import { enUS, esES } from '@material-ui/core/locale';
import DateFnsUtils from '@date-io/date-fns';
import esLocale from "date-fns/locale/es";
import enLocale from "date-fns/locale/en-US";

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
const localeMap = {
    en: {fns: enLocale, theme: enUS},
    es: {fns: esLocale, theme: esES},
};

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            <IntlProvider locale={locale} messages={messages}>
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap[locale].fns}>
                    <SnackbarProvider anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                                      autoHideDuration={2500}>
                        <App/>
                    </SnackbarProvider>
                </MuiPickersUtilsProvider>
            </IntlProvider>
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
