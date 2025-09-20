const { up, down } = require('../../../src/database/migrations/01-create-categories-table');

describe('01-create-categories-table', () => {
    let mockDb;

    beforeEach(() => {
        mockDb = {
            exec: jest.fn(),
        };
    });

    test('should run the "up" migration successfully', async () => {
        await up(mockDb);
        expect(mockDb.exec).toHaveBeenCalledWith(expect.stringContaining('CREATE TABLE categories'));
    });

    test('should run the "down" migration successfully', async () => {
        await down(mockDb);
        expect(mockDb.exec).toHaveBeenCalledWith('DROP TABLE categories');
    });
});
