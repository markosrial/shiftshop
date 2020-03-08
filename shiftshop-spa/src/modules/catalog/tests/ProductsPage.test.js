import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {IntlProvider} from 'react-intl';

import {initReactIntl} from "../../../i18n";

import ProductsPage from '../components/ProductsPage';
import {Role} from '../../users';

jest.mock('../components/AddProduct', () => () => (<mockAddProduct/>));
jest.mock('../components/ProductsSearch', () => () => (<mockProductsSearch/>));

const {messages} = initReactIntl();

describe('ProductsPage snapshot', () => {

    const middlewares = [];
    const mockStore = configureStore(middlewares);

    const salesmanUser = {users: {user: {username: 'user', roles: [Role.SALESMAN]}}};
    const adminUser = {users: {user: {username: 'user', roles: [Role.ADMIN]}}};

    const createProductsPage = store => {

        return renderer.create(
            <Provider store={store}>
                <IntlProvider locale='en' messages={messages}>
                    <ProductsPage/>
                </IntlProvider>
            </Provider>
        );

    };

    test('Without addProduct', () => {

        // Initialize mockstore with empty state
        const initialState = salesmanUser;
        const store = mockStore(initialState);

        const productsPage = createProductsPage(store);

        expect(productsPage.toJSON()).toMatchSnapshot();

    });

    test('With addProduct', () => {

        // Initialize mockstore with empty state
        const initialState = adminUser;
        const store = mockStore(initialState);

        const productsPage = createProductsPage(store);

        expect(productsPage.toJSON()).toMatchSnapshot();

    });

});
