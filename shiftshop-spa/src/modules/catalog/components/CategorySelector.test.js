import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {IntlProvider} from 'react-intl';

import {initReactIntl} from "../../../i18n";

import CategorySelector from './CategorySelector';

const {messages} = initReactIntl();

describe('CategorySelector snapshot', () => {

    const middlewares = [];
    const mockStore = configureStore(middlewares);

    const someCategories = {catalog: {categories: [{id: 1, name: 'CategoryA'}, {id: 2, name: 'CategoryB'}]}};

    const createCategorySelector = (store, props) => {

        return renderer.create(
            <Provider store={store}>
                <IntlProvider locale='en' messages={messages}>
                    <CategorySelector{...props}/>
                </IntlProvider>
            </Provider>
        );

    };

    test('Categories has elements and first is selected', () => {

        // Initialize mockstore with empty state
        const store = mockStore(someCategories);

        const categorySelector = createCategorySelector(store, {selectedCategory: 1, allCategories: true, handleSelectedCategory: jest.fn()});

        expect(categorySelector.toJSON()).toMatchSnapshot();

    });

});
