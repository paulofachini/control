const request = require('supertest');

const API_URL = 'http://localhost:3000';

describe('Finance API - E2E Tests', () => {

    test('should return a list of financial entries', async () => {
        const response = await request(API_URL).get('/finances');

        // Assertions
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

});
