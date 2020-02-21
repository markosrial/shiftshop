import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {IntlProvider} from 'react-intl';
import {SnackbarProvider} from 'notistack';

import {initReactIntl} from "../../../i18n";

import AddCategory from './AddCategory';

const {messages} = initReactIntl();

describe('AddCategory snapshot', () => {

    const middlewares = [];
    const mockStore = configureStore(middlewares);

    const createAddCategory = store => {

        return renderer.create(
            <SnackbarProvider>
                <Provider store={store}>
                    <IntlProvider locale='en' messages={messages}>
                        <AddCategory/>
                    </IntlProvider>
                </Provider>
            </SnackbarProvider>
        );

    };

    test('Initial state', () => {

        // Initialize mockstore with empty state
        const initialState = {};
        const store = mockStore(initialState);

        const addCategory = createAddCategory(store);

        expect(addCategory.toJSON()).toMatchSnapshot();

    });

});
