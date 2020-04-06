import * as actionTypes from './actionTypes';

import {ProductsDB} from '../../databases';

const loadCatalogCompleted = catalog => ({
    type: actionTypes.LOAD_CATALOG_COMPLETED,
    catalog
});

export const loadCatalog = onError => dispatch =>
    ProductsDB.init().then(
        productDB => productDB.getAll()
    ).then(products => dispatch(loadCatalogCompleted(products))
    ).catch(onError);
