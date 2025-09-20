const { openDb } = require('../database/sqlite');
const queries = require('../database/queries');

async function createCategory(name) {
    const db = await openDb();
    const result = await db.run(queries.createCategory, [name]);
    return { id: result.lastID, name };
}

async function getCategories() {
    const db = await openDb();
    const categories = await db.all(queries.getCategories);
    return categories;
}

async function getCategoryById(id) {
    const db = await openDb();
    const category = await db.get(queries.getCategoryById, id);
    return category || null;
}

async function updateCategory(id, name) {
    const db = await openDb();
    const categoryExists = await db.get(queries.getCategoryById, id);
    if (!categoryExists) {
        return null;
    }
    await db.run(queries.updateCategory, [name, id]);
    return { id, name };
}

async function deleteCategory(id) {
    const db = await openDb();
    const categoryExists = await db.get(queries.getCategoryById, id);
    if (!categoryExists) {
        return false;
    }
    await db.run(queries.deleteCategory, [id]);
    return true;
}

module.exports = {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
};
