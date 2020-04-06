import ErrorTypes from './ErrorTypes';

// Create
const add = db => async (doc) => {
    try {
        return await db.put(doc);
    } catch (err) {
        throw ErrorTypes.Duplicated;
    }
};

// Read
const getById = db => async id => {
    try {
        return await db.get(id);
    } catch (err) {
        throw ErrorTypes.NotFound;
    }
};

const getAll = db => async () => {
    try {
        const result = db.allDocs({include_docs : true});
        return result;
    } catch (err) {
        throw ErrorTypes.ReadDocs;
    }
};

// Update
const update = db => async (id, data) => {
    try {
        let doc = await db.get(id);
        return await db.put({...doc, ...data});
    } catch (err) {
        throw ErrorTypes.NotFound;
    }
};

// Delete
const remove = db => async id => {
    try {
        let doc = await db.get(id);
        return await db.remove(doc);
    } catch (err) {
        throw ErrorTypes.NotFound;
    }
};

const PouchCRUD = db => ({
    add: add(db),
    getById: getById(db),
    getAll: getAll(db),
    update: update(db),
    remove: remove(db),
});

export default PouchCRUD;
