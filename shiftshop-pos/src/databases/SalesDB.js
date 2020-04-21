import PouchDB from 'pouchdb';
import PouchdbFind from 'pouchdb-find';
import PouchCRUD from './PouchCRUD';

import ErrorTypes from './ErrorTypes';

const dbName = 'Sales';

export const instantiate = async () => {

    const db = new PouchDB(dbName, {revs_limit: 1, auto_compaction: true});

    // CRUD operations and query indexes
    const CRUD = PouchCRUD(db);
    PouchDB.plugin(PouchdbFind);

    //Index initialization
    try {
        await db.createIndex({index: {fields: ['barcode', 'uploaded']}});
    } catch (err) {
        throw ErrorTypes.FailedInitIndexes;
    }

    const extraFuncs = {
        getByBarcode: getByBarcode(db),
        getByDate: getByDate(db)
    }

    return ({
        name: dbName,
        ...CRUD,
        ...extraFuncs,
        close: db.close,
        destroy: db.destroy
    });

};

const getByBarcode = db => async (barcode) => {

    try {

        const saleFound = await db.find({selector: {barcode}})
        return (saleFound.docs.length === 0 ? null : saleFound.docs[0])

    } catch (err) {
        throw ErrorTypes.NotIndexedSearch;
    }

}

const getByDate = db => async (date) => {

    try {

        const dayString = date.toISOString().split("T")[0];

        const salesFound = await db.allDocs({
            include_docs: true,
            descending: true,
            startkey: `${dayString}\ufff0`,
            endkey: dayString
        });

        return salesFound.rows.map(row => row.doc);

    } catch (err) {
        throw ErrorTypes.NotFound;
    }

}

export default {instantiate};
