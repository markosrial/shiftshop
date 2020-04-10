import PouchDB from 'pouchdb';
import PouchCRUD from './PouchCRUD';

const dbName = 'LocalSales';

export const instantiate = () => {

    const db = new PouchDB(dbName);

    // CRUD operations and query indexes
    const CRUD = PouchCRUD(db);

    return ({
        name: dbName,
        ...CRUD,
        close: db.close,
        destroy: db.destroy
    });

};

export default {instantiate};
