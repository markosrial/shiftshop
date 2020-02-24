import React from 'react';
import renderer, {act} from 'react-test-renderer';
import {SnackbarProvider} from 'notistack';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {IntlProvider} from 'react-intl';

import {initReactIntl} from "../../../i18n";

import EditCategory from './EditCategory';

const {messages} = initReactIntl();

describe('EditCategory snapshot', () => {

    const middlewares = [];
    const mockStore = configureStore(middlewares);

    const createEditCateogry = props => {

        const store = mockStore();

        return renderer.create(
            <Provider store={store}>
                <IntlProvider locale='en' messages={messages}>
                    <SnackbarProvider>
                        <EditCategory {...props}/>
                    </SnackbarProvider>
                </IntlProvider>
            </Provider>
        );

    };

    const categoryExample = {id: 1, name: 'Category'};

    test('EditCategory with null category', () => {

        const editCategory = createEditCateogry({category: null, onClose: jest.fn()});

        expect(editCategory.toJSON()).toMatchSnapshot();

    });

    test('EditCategory with null onClose', () => {

        const editCategory = createEditCateogry({category: categoryExample, onClose: null});

        expect(editCategory.toJSON()).toMatchSnapshot();

    });

    /* Error trying to run with Dialog components -> material-ui Fade component test issue

    test('EditCategory with correct props', () => {

        const editCategory = createEditCateogry({category: categoryExample, onClose: jest.fn()});

        expect(editCategory.toJSON()).toMatchSnapshot();

    });

    */

});
