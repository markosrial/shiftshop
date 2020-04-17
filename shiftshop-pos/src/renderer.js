import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {SnackbarProvider} from 'notistack';
import {IntlProvider} from 'react-intl';
import {MuiThemeProvider} from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import { enUS, esES } from '@material-ui/core/locale';
import DateFnsUtils from '@date-io/date-fns';
import esLocale from "date-fns/locale/es";
import enLocale from "date-fns/locale/en-US";

/* Async/await regenerator necesaries */
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import './assets/scss/index.scss';
import theme from './theme'

import {App} from './modules/app';

import configureStore from './store';
import {initReactIntl} from "./i18n";

/* Configure store. */
const store = configureStore();

/* Configure i18n. */
const {locale, messages} = initReactIntl();
const localeMap = {
    en: {fns: enLocale, theme: enUS},
    es: {fns: esLocale, theme: esES},
};

ReactDOM.render(
    <MuiThemeProvider theme={theme(localeMap[locale].theme)}>
        <Provider store={store}>
            <IntlProvider locale={locale} messages={messages}>
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap[locale].fns}>
                    <SnackbarProvider anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                                      autoHideDuration={1500}>
                        <App/>
                    </SnackbarProvider>
                </MuiPickersUtilsProvider>
            </IntlProvider>
        </Provider>
    </MuiThemeProvider>,
    document.getElementById("root"));
