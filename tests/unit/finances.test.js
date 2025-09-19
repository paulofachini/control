const financeService = require('../../src/services/financesService');

describe('Finance Service - Unit Tests', () => {

    test('should return all financial entries from the service', () => {
        const entries = financeService.getAll();

        // Verificações
        expect(Array.isArray(entries)).toBe(true);
        expect(entries.length).toBeGreaterThan(0);
        expect(entries[0]).toHaveProperty('id');
        expect(entries[0]).toHaveProperty('description');
        expect(entries[0]).toHaveProperty('amount');
    });

});
