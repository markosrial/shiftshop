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

// Update
const update = db => async (_id, ...data) => {
    try {
        let doc = await db.get(_id);
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
    update: update(db),
    remove: remove(db),
});

export default PouchCRUD;
