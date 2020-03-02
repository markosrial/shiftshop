import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {IntlProvider} from 'react-intl';

import {initReactIntl} from "../../../i18n";

import ProductsSearchResult from '../components/ProductsSearchResult';

jest.mock('../components/ProductList', () => () => (<mockProductList/>));

const {messages} = initReactIntl();

describe('ProductsSearchResult snapshot', () => {

    const middlewares = [];
    const mockStore = configureStore(middlewares);

    const isSearching = {searching: true};
    const isNotSearching = {searching: false};


    const createProductsSearchResult = (store, props) => {

        return renderer.create(
            <Provider store={store}>
                <IntlProvider locale='en' messages={messages}>
                    <ProductsSearchResult {...props}/>
                </IntlProvider>
            </Provider>
        );

    };

    test('Searching products', () => {

        // Initialize mockstore with empty state
        const initialState = {catalog: {productsSearch: null}};
        const store = mockStore(initialState);

        const productsSearchResult = createProductsSearchResult(store, isSearching);

        expect(productsSearchResult.toJSON()).toMatchSnapshot();

    });

    test('Not initialized productsSearch', () => {

        // Initialize mockstore with empty state
        const initialState = {catalog: {productsSearch: null}};
        const store = mockStore(initialState);

        const productsSearchResult = createProductsSearchResult(store, isNotSearching);

        expect(productsSearchResult.toJSON()).toMatchSnapshot();

    });

    test('Empty items in productsSearch', () => {

        // Initialize mockstore with empty state
        const initialState = {catalog: {productsSearch: {result: {items: []}}}};
        const store = mockStore(initialState);

        const productsSearchResult = createProductsSearchResult(store, isNotSearching);

        expect(productsSearchResult.toJSON()).toMatchSnapshot();

    });

    test('Some items in productsSearch', () => {

        // Initialize mockstore with empty state
        const initialState = {catalog: {productsSearch: {result: {items: [{}, {}]}, criteria: {}}}};
        const store = mockStore(initialState);

        const productsSearchResult = createProductsSearchResult(store, isNotSearching);

        expect(productsSearchResult.toJSON()).toMatchSnapshot();

    });

});
