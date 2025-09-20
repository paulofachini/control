const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');

let db = null;

async function openDb() {
    if (db) {
        return db;
    }

    db = await open({
        filename: path.resolve(__dirname, 'database.db'),
        driver: sqlite3.Database,
    });

    return db;
}

module.exports = { openDb };
