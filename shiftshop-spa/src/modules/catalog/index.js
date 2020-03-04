import * as actions from './actions';
import * as actionTypes from './actionTypes';
import reducer from './reducer';
import * as selectors from './selectors';

export {default as CategoriesPage} from './components/CategoriesPage';
export {default as ProductsPage} from './components/ProductsPage';
export {default as ProductPage} from './components/ProductPage';

export default {actions, actionTypes, reducer, selectors};
