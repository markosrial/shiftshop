import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {IntlProvider} from 'react-intl';
import {MuiThemeProvider} from '@material-ui/core';
import {SnackbarProvider} from 'notistack';

import {initReactIntl} from "../../../i18n";
import theme from '../../../theme';

import ProductResult from '../components/ProductResult';
import {Role} from '../../users';

jest.mock('../components/ProductDetails', () => () => (<mockProductDetails/>));
jest.mock('../components/ProductProfitText', () => () => (<mockProductProfitText/>));
jest.mock('../components/ProductChangeState', () => () => (<mockProductChangeState/>));

const {messages} = initReactIntl();

describe('ProductResult snapshot', () => {

    const middlewares = [];
    const mockStore = configureStore(middlewares);

    const salesmanUser = {users: {user: {username: 'user', roles: [Role.SALESMAN]}}};
    const adminUser = {users: {user: {username: 'user', roles: [Role.ADMIN]}}};

    const createProductResult = (store, product) => {

        return renderer.create(
            <MuiThemeProvider theme={theme}>
                <SnackbarProvider>
                    <Provider store={store}>
                        <IntlProvider locale='en' messages={messages}>
                            <BrowserRouter>
                                <ProductResult product={product}/>
                            </BrowserRouter>
                        </IntlProvider>
                    </Provider>
                </SnackbarProvider>
            </MuiThemeProvider>
        );

    };

    test('Product null', () => {

        // Initialize mockstore
        const initialState = salesmanUser;
        const store = mockStore(initialState);

        const productResult = createProductResult(store, null);

        expect(productResult.toJSON()).toMatchSnapshot();

    });

    test('Product not null with edit permissions', () => {

        // Initialize mockstore
        const initialState = adminUser;
        const store = mockStore(initialState);

        const product = {};

        const productResult = createProductResult(store, product);

        expect(productResult.toJSON()).toMatchSnapshot();

    });

    test('Product not null without edit permissions', () => {

        // Initialize mockstore
        const initialState = salesmanUser;
        const store = mockStore(initialState);

        const product = {};

        const productResult = createProductResult(store, product);

        expect(productResult.toJSON()).toMatchSnapshot();

    });

});
