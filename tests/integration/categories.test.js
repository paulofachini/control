const request = require('supertest');
const app = require('../../src/app');
const { runMigrations } = require('../../src/database/runMigrations');
const { openDb } = require('../../src/database/sqlite');
const fs = require('fs/promises');
const path = require('path');

const dbPath = path.resolve(__dirname, '../../src/database/database.db');

describe('Categories API - Integration Tests', () => {

    beforeAll(async () => {
        try {
            // Apaga o banco de dados antes de todos os testes
            await fs.unlink(dbPath);
        } catch (error) {}

        await runMigrations();
    });

    afterAll(async () => {
        // Encerra a conexão e apaga o arquivo do banco de dados após todos os testes
        const db = await openDb();
        await db.close();
        try {
            await fs.unlink(dbPath);
        } catch (error) {}
    });

    afterEach(async () => {
        // Limpa os dados da tabela após cada teste
        const db = await openDb();
        await db.exec('DELETE FROM categories');
    });

    test('should create a new category', async () => {
        const newCategory = { name: 'Aluguel' };
        const response = await request(app)
            .post('/categories')
            .send(newCategory);

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe(newCategory.name);
    });

    test('should return all categories', async () => {
        const newCategory = { name: 'Comida' };
        await request(app).post('/categories').send(newCategory);

        const response = await request(app).get('/categories');

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThanOrEqual(1);

        const createdCategory = response.body.find(cat => cat.name === newCategory.name);
        expect(createdCategory).toBeDefined();
        expect(createdCategory.name).toBe(newCategory.name);
    });

    test('should return a category by ID', async () => {
        const newCategory = { name: 'Transporte' };
        const createResponse = await request(app).post('/categories').send(newCategory);
        const categoryId = createResponse.body.id;

        const getByIdResponse = await request(app).get(`/categories/${categoryId}`);

        expect(getByIdResponse.statusCode).toBe(200);
        expect(getByIdResponse.body).toHaveProperty('id', categoryId);
        expect(getByIdResponse.body).toHaveProperty('name', newCategory.name);
    });

    test('should return 404 for a non-existent category ID on GET', async () => {
        const nonExistentId = 999;
        const response = await request(app).get(`/categories/${nonExistentId}`);

        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty('error', 'Category not found');
    });

    test('should update an existing category', async () => {
        const newCategory = { name: 'Aluguel' };
        const createResponse = await request(app).post('/categories').send(newCategory);
        const categoryId = createResponse.body.id;

        const updatedName = 'Moradia';
        const updateResponse = await request(app)
            .put(`/categories/${categoryId}`)
            .send({ name: updatedName });

        expect(updateResponse.statusCode).toBe(200);
        expect(updateResponse.body.name).toBe(updatedName);

        const getResponse = await request(app).get('/categories');
        const updatedCategory = getResponse.body.find(cat => cat.id === categoryId);
        expect(updatedCategory).toBeDefined();
        expect(updatedCategory.name).toBe(updatedName);
    });

    test('should return 404 for a non-existent category ID on PUT', async () => {
        const nonExistentId = 999;
        const updateResponse = await request(app)
            .put(`/categories/${nonExistentId}`)
            .send({ name: 'Nova Categoria' });

        expect(updateResponse.statusCode).toBe(404);
    });

    test('should delete an existing category', async () => {
        const newCategory = { name: 'Supermercado' };
        const createResponse = await request(app).post('/categories').send(newCategory);
        const categoryId = createResponse.body.id;

        const deleteResponse = await request(app).delete(`/categories/${categoryId}`);

        expect(deleteResponse.statusCode).toBe(204);

        const getResponse = await request(app).get('/categories');
        const deletedCategory = getResponse.body.find(cat => cat.id === categoryId);
        expect(deletedCategory).toBeUndefined();
    });

    test('should return 404 for a non-existent category ID on DELETE', async () => {
        const nonExistentId = 999;
        const deleteResponse = await request(app).delete(`/categories/${nonExistentId}`);
        expect(deleteResponse.statusCode).toBe(404);
    });
});
