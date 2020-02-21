import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store'
import {IntlProvider} from 'react-intl';

import {initReactIntl} from "../../../i18n";

import LoginForm from './LoginForm';

const {messages} = initReactIntl();

describe('LoginForm snapshot', () => {

    const middlewares = [];
    const mockStore = configureStore(middlewares);

    const createLoginForm = store => {

        return renderer.create(
            <Provider store={store}>
                <IntlProvider locale='en' messages={messages}>
                    <LoginForm/>
                </IntlProvider>
            </Provider>
        );

    };

    test('Initial state', () => {

        // Initialize mockstore with empty state
        const initialState = {};
        const store = mockStore(initialState);

        const loginForm = createLoginForm(store);

        expect(loginForm.toJSON()).toMatchSnapshot();

    });

});
