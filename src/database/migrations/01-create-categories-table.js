exports.up = async (db) => {
    await db.exec(`
        CREATE TABLE categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE
        )
    `);
};

exports.down = async (db) => {
    await db.exec('DROP TABLE categories');
};
