import React from 'react';
import renderer from 'react-test-renderer';
import {IntlProvider} from 'react-intl';

import {initReactIntl} from "../../../i18n";

import ProductsSearchBar from '../components/ProductsSearchBar';

jest.mock('../components/CategorySelector', () => () => (<mockCategorySelector/>));

const {messages} = initReactIntl();

describe('ProductsSearchBar snapshot', () => {

    const content = {keywords: 'test', category: 1};

    const enabledSearching = {...content, searching: false};
    const disabledSearching = {...content, searching: true};

    const createProductsSearchBar = ({keywords, category, searching}) => {

        return renderer.create(
            <IntlProvider locale='en' messages={messages}>
                <ProductsSearchBar keywords={keywords} category={category} searching={searching}
                                   handleChangeKeywords={jest.fn()} handleChangeCategory={jest.fn()}
                                   onSearch={jest.fn()}/>
            </IntlProvider>
        );

    };

    test('With values and enabled search', () => {

        const productsSearchBar = createProductsSearchBar(enabledSearching);

        expect(productsSearchBar.toJSON()).toMatchSnapshot();

    });

    test('Disabled search', () => {

        const productsSearchBar = createProductsSearchBar(disabledSearching);

        expect(productsSearchBar.toJSON()).toMatchSnapshot();

    });

});
