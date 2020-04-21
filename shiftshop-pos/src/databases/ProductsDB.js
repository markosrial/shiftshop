import PouchDB from 'pouchdb';
import PouchCRUD from './PouchCRUD';

const dbName = 'Products';

export const instantiate = () => {

    const db = new PouchDB(dbName, {revs_limit: 1, auto_compaction: true});

    // CRUD operations and query indexes
    const CRUD = PouchCRUD(db);

    // Functions
    const getAllProducts = async () => {

        const products = await CRUD.getAll();

        return products.rows.map(
            row => {
                const {_id, id, name, salePrice, barcode} = row.doc;
                return {_id, id, name, salePrice, barcode};
            });

    };

    return ({
        name: dbName,
        ...CRUD,
        getAll: getAllProducts,
        close: db.close,
        destroy: db.destroy
    });

};

export default {instantiate};
