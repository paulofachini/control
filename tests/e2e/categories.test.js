const request = require('supertest');

const API_URL = 'http://localhost:3000';

describe('E2E Test - Categories API', () => {

    test('should perform a full CRUD operation on a category', async () => {
        let categoryId;
        const initialCategoryName = 'Viagem';
        const updatedCategoryName = 'Férias';

        // 1. CREATE: Crie uma nova categoria
        const createResponse = await request(API_URL)
            .post('/categories')
            .send({ name: initialCategoryName });

        expect(createResponse.statusCode).toBe(201);
        expect(createResponse.body).toHaveProperty('id');
        expect(createResponse.body.name).toBe(initialCategoryName);
        categoryId = createResponse.body.id;

        // 2. READ (all): Liste todas as categorias para verificar a criação
        const getResponse = await request(API_URL).get('/categories');
        expect(getResponse.statusCode).toBe(200);
        const createdCategory = getResponse.body.find(c => c.id === categoryId);
        expect(createdCategory).toBeDefined();

        // 3. READ (by ID): Verifique a categoria criada pelo ID
        const getByIdResponse = await request(API_URL).get(`/categories/${categoryId}`);
        expect(getByIdResponse.statusCode).toBe(200);
        expect(getByIdResponse.body.name).toBe(initialCategoryName);

        // 4. UPDATE: Atualize o nome da categoria
        const updateResponse = await request(API_URL)
            .put(`/categories/${categoryId}`)
            .send({ name: updatedCategoryName });

        expect(updateResponse.statusCode).toBe(200);
        expect(updateResponse.body.name).toBe(updatedCategoryName);

        // 5. READ (after update): Confirme a atualização
        const getUpdatedResponse = await request(API_URL).get(`/categories/${categoryId}`);
        expect(getUpdatedResponse.statusCode).toBe(200);
        expect(getUpdatedResponse.body.name).toBe(updatedCategoryName);

        // 6. DELETE: Deletar a categoria
        const deleteResponse = await request(API_URL).delete(`/categories/${categoryId}`);
        expect(deleteResponse.statusCode).toBe(204);

        // 7. READ (after delete): Confirme que a categoria não existe mais
        const getAfterDeleteResponse = await request(API_URL).get(`/categories/${categoryId}`);
        expect(getAfterDeleteResponse.statusCode).toBe(404);
    });
});
