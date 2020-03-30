import PouchDB from 'pouchdb';
import PouchCRUD from './PouchCRUD';

const dbName = 'Users';

export const init = async () => {

    const db = new PouchDB(dbName);

    // CRUD operations and query indexes
    const CRUD = PouchCRUD(db);

    return ({name: dbName, close: db.close, destroy: db.destroy, ...CRUD});

};

export default {init};
