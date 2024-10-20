import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {IntlProvider} from 'react-intl';

import {initReactIntl} from "../../../i18n";

import CategoriesPage from '../components/CategoriesPage';
import {Role} from '../../users';

jest.mock('../components/AddCategory', () => () => (<mockAddCategory/>));
jest.mock('../components/CategoriesList', () => () => (<mockCategoriesList/>));

const {messages} = initReactIntl();

describe('CategoriesPage snapshot', () => {

    const middlewares = [];
    const mockStore = configureStore(middlewares);

    const salesmanUser = {users: {user: {username: 'user', roles: [Role.SALESMAN]}}};
    const adminUser = {users: {user: {username: 'user', roles: [Role.ADMIN]}}};

    const createCategoriesPage = store => {

        return renderer.create(
            <Provider store={store}>
                <IntlProvider locale='en' messages={messages}>
                    <CategoriesPage/>
                </IntlProvider>
            </Provider>
        );

    };

    test('Without addCategory', () => {

        // Initialize mockstore
        const initialState = salesmanUser;
        const store = mockStore(initialState);

        const categoriesPage = createCategoriesPage(store);

        expect(categoriesPage.toJSON()).toMatchSnapshot();

    });

    test('With addCategory', () => {

        // Initialize mockstore
        const initialState = adminUser;
        const store = mockStore(initialState);

        const categoriesPage = createCategoriesPage(store);

        expect(categoriesPage.toJSON()).toMatchSnapshot();

    });

});
