import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {IntlProvider} from 'react-intl';
import configureStore from 'redux-mock-store';

import {initReactIntl} from "../../../i18n";

import ProductsSearchBar from '../components/ProductsSearchBar';

jest.mock('../components/CategorySelector', () => () => (<mockCategorySelector/>));

const {messages} = initReactIntl();

describe('ProductsSearchBar snapshot', () => {

    const middlewares = [];
    const mockStore = configureStore(middlewares);

    const initialStore = {catalog: {categories: [{id: 1, name: 'CategoryA'}, {id: 2, name: 'CategoryB'}]}};

    const enabledSearching = {searching: false};
    const disabledSearching = {searching: true};

    const createProductsSearchBar = (store, {searching}) => {

        return renderer.create(
            <Provider store={store}>
                <IntlProvider locale='en' messages={messages}>
                    <ProductsSearchBar searching={searching} startSearch={jest.fn()} stopSearch={jest.fn()}/>
                </IntlProvider>
            </Provider>
        );

    };

    test('With values and enabled search', () => {

        // Initialize mockstore
        const store = mockStore(initialStore);

        const productsSearchBar = createProductsSearchBar(store, enabledSearching);

        expect(productsSearchBar.toJSON()).toMatchSnapshot();

    });

    test('Disabled search', () => {

        // Initialize mockstore
        const store = mockStore(initialStore);

        const productsSearchBar = createProductsSearchBar(store, disabledSearching);

        expect(productsSearchBar.toJSON()).toMatchSnapshot();

    });

});
