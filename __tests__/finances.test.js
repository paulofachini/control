const request = require('supertest');
const app = require('../src/app');

describe('Control Finances API', () => {

    test('should return a list of financial entries', async () => {
        const response = await request(app).get('/finances');
        
        // Assertions
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

});
