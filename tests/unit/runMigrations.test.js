const { runMigrations } = require('../../src/database/runMigrations');
const { openDb } = require('../../src/database/sqlite');

jest.mock('../../src/database/sqlite');
jest.mock('../../src/database/migrations/01-create-categories-table', () => ({
    up: jest.fn(),
    down: jest.fn(),
}));

describe('runMigrations', () => {
    test('should not run migration if it already exists', async () => {
        const mockDb = {
            exec: jest.fn(),
            get: jest.fn(() => ({ name: '01-create-categories-table' })),
            run: jest.fn(),
            close: jest.fn(),
        };
        openDb.mockResolvedValue(mockDb);

        const createCategoriesTable = require('../../src/database/migrations/01-create-categories-table');

        await runMigrations();

        expect(createCategoriesTable.up).not.toHaveBeenCalled();
    });
});