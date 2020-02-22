import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {IntlProvider} from 'react-intl';

import {initReactIntl} from "../../../i18n";

import CategoriesList from './CategoriesList';
import {Role} from '../../users';

jest.mock('./CategoriesListItem', () => () => (<mockCategoriesListItem/>));

const {messages} = initReactIntl();

describe('CategoriesList snapshot', () => {

    const middlewares = [];
    const mockStore = configureStore(middlewares);

    const emptyCategories = {catalog: {categories: []}};
    const someCategories = {catalog: {categories: [{id: 1, name: 'CategoryA'}, {id: 2, name: 'CategoryB'}]}};

    const createCategoriesList = store => {

        return renderer.create(
            <Provider store={store}>
                <IntlProvider locale='en' messages={messages}>
                    <CategoriesList/>
                </IntlProvider>
            </Provider>
        );

    };

    test('Categories is empty', () => {

        // Initialize mockstore with empty state
        const store = mockStore(emptyCategories);

        const categoriesList = createCategoriesList(store);

        expect(categoriesList.toJSON()).toMatchSnapshot();

    });

    test('Categories has elements', () => {

        // Initialize mockstore with empty state
        const store = mockStore(someCategories);

        const categoriesList = createCategoriesList(store);

        expect(categoriesList.toJSON()).toMatchSnapshot();

    });

});
