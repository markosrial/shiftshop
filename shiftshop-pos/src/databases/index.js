export {default as SalesDB} from './SalesDB';
export {default as ProductsDB} from './ProductsDB';
export {default as UsersDB} from './UsersDB';
export {default as ErrorsDB} from './ErrorTypes';

export const initPersistStorage = () => navigator.storage.persisted().then(
    persisted => persisted && console.log("Success on persist"),
    _  => console.log("Failed on persist"));
