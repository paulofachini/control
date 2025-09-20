module.exports = {
    createCategory: `
        INSERT INTO categories (name) VALUES (?)
    `,
    getCategories: `
        SELECT * FROM categories
    `,
    updateCategory: `
        UPDATE categories SET name = ? WHERE id = ?
    `,
    deleteCategory: `
        DELETE FROM categories WHERE id = ?
    `,
    getCategoryById: `
        SELECT * FROM categories WHERE id = ?
    `,
};
