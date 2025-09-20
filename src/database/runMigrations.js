const path = require('path');
const { openDb } = require('./sqlite');
const fs = require('fs/promises');

async function runMigrations() {
    const db = await openDb();

    await db.exec(`
        CREATE TABLE IF NOT EXISTS migrations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE,
            run_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
    `);

    const migrationsDir = path.resolve(__dirname, 'migrations');
    const files = await fs.readdir(migrationsDir);

    files.sort();

    for (const file of files) {
        const migrationName = file.split('.js')[0];
        const exists = await db.get('SELECT name FROM migrations WHERE name = ?', migrationName);

        if (!exists) {
            const migration = require(path.join(migrationsDir, file));
            await migration.up(db);
            await db.run('INSERT INTO migrations (name) VALUES (?)', migrationName);
        }
    }
}

module.exports = { runMigrations };
