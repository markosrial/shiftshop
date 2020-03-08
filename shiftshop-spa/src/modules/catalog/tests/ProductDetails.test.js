import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {IntlProvider} from 'react-intl';

import {initReactIntl} from "../../../i18n";

import ProductDetails from '../components/ProductDetails';

const {messages} = initReactIntl();

describe('ProductDetails snapshot', () => {

    const middlewares = [];
    const mockStore = configureStore(middlewares);

    const categories = {catalog: {categories: [{id: 1, name: 'Category'}]}};

    const createProductDetails = (store, product) => {

        return renderer.create(
            <Provider store={store}>
                <IntlProvider locale='en' messages={messages}>
                    <ProductDetails product={product}/>
                </IntlProvider>
            </Provider>
        );

    };

    test('Product active and with positive ROI', () => {

        // Initialize mockstore with empty state
        const initialState = categories;
        const store = mockStore(initialState);

        const product = {
            name: 'Product',
            categoryId: categories[0],
            providerPrice: 2.0,
            salePrice: 7.5,
            active: true
        };

        const productDetails = createProductDetails(store, product);

        expect(productDetails.toJSON()).toMatchSnapshot();

    });

    test('Product active and with neutral ROI', () => {

        // Initialize mockstore with empty state
        const initialState = categories;
        const store = mockStore(initialState);

        const product = {
            name: 'Product',
            categoryId: categories[0],
            providerPrice: 2.0,
            salePrice: 2.0,
            active: true
        };

        const productDetails = createProductDetails(store, product);

        expect(productDetails.toJSON()).toMatchSnapshot();

    });

    test('Product inactive and with negative ROI', () => {

        // Initialize mockstore with empty state
        const initialState = categories;
        const store = mockStore(initialState);

        const product = {
            name: 'Product',
            categoryId: categories[0],
            providerPrice: 2.0,
            salePrice: 1.75,
            active: false
        };

        const productDetails = createProductDetails(store, product);

        expect(productDetails.toJSON()).toMatchSnapshot();

    });

});
