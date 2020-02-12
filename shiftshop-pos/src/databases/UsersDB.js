import PouchDB from 'pouchdb';
import PouchdbFind from 'pouchdb-find';
import PouchCRUD from './PouchCRUD';

import ErrorTypes from './ErrorTypes';

const dbName = 'Users';

export const init = async () => {

    const db = new PouchDB(dbName);

    // CRUD operations and query indexes
    const CRUD = PouchCRUD(db);
    PouchDB.plugin(PouchdbFind);

    // Index initialization
    try {
        await db.createIndex({index: {fields: ['username']}});
    } catch (err) {
        throw ErrorTypes.FailedInitIndexes;
    }

    // Load test data
    try {
        await CRUD.add({_id: '1', username: 'user', password: 'user'});
    } catch (e) { }

    // DB functionality
    const func = {
        getByUsername: getByUsername(db)
    };

    return ({name: dbName, close: db.close, ...CRUD, ...func});

};

const getByUsername = db => async (username) => {
    try {
        const usersFound = await db.find({selector: {username}});
        return (usersFound.docs.length === 0 ? null : usersFound.docs[0]);
    } catch (err) {
        throw ErrorTypes.NotIndexedSearch;
    }
};

export default {init};
