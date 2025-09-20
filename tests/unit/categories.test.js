const categoriesController = require('../../src/controllers/categoriesController');
const categoriesService = require('../../src/services/categoriesService');

jest.mock('../../src/services/categoriesService');

describe('Categories Controller - Unit Tests', () => {
    let mockRequest;
    let mockResponse;

    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            status: jest.fn(() => mockResponse),
            json: jest.fn(),
            end: jest.fn(),
        };
    });

    test('should return 400 if name is missing on creation', async () => {
        mockRequest.body = {};

        await categoriesController.create(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Name is required' });
    });

    test('should return 409 if category name already exists', async () => {
        mockRequest.body = { name: 'Aluguel' };
        categoriesService.createCategory.mockRejectedValue({ code: 'SQLITE_CONSTRAINT_UNIQUE' });

        await categoriesController.create(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(409);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Category with this name already exists' });
    });

    test('should return 400 if name is missing on update', async () => {
        mockRequest.params = { id: 1 };
        mockRequest.body = {};

        await categoriesController.update(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Name is required' });
    });

    test('should return 404 if category not found on update', async () => {
        mockRequest.params = { id: 999 };
        mockRequest.body = { name: 'Nova Categoria' };
        categoriesService.updateCategory.mockResolvedValue(null);

        await categoriesController.update(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Category not found' });
    });

    test('should return 404 if category not found on deletion', async () => {
        mockRequest.params = { id: 999 };
        categoriesService.deleteCategory.mockResolvedValue(false);

        await categoriesController.del(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Category not found' });
    });

    test('should return 404 if category not found on get by ID', async () => {
        mockRequest.params = { id: 999 };
        categoriesService.getCategoryById.mockResolvedValue(null);

        await categoriesController.getById(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Category not found' });
    });

    test('should return 500 on an unexpected service error', async () => {
      mockRequest.body = { name: 'New Category' };
      categoriesService.createCategory.mockRejectedValue(new Error('Unexpected error'));

      await categoriesController.create(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });

    test('should return 500 on an unexpected service error during create', async () => {
        mockRequest.body = { name: 'New Category' };
        categoriesService.createCategory.mockRejectedValue(new Error('Unexpected error'));

        await categoriesController.create(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });

    test('should return 500 on an unexpected service error during get', async () => {
        categoriesService.getCategories.mockRejectedValue(new Error('Unexpected error'));

        await categoriesController.get(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });

    test('should return 500 on an unexpected service error during get by ID', async () => {
        mockRequest.params = { id: 1 };
        categoriesService.getCategoryById.mockRejectedValue(new Error('Unexpected error'));

        await categoriesController.getById(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });

    test('should return 500 on an unexpected service error during update', async () => {
        mockRequest.params = { id: 1 };
        mockRequest.body = { name: 'Updated Name' };
        categoriesService.updateCategory.mockRejectedValue(new Error('Unexpected error'));

        await categoriesController.update(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });

    test('should return 500 on an unexpected service error during delete', async () => {
        mockRequest.params = { id: 1 };
        categoriesService.deleteCategory.mockRejectedValue(new Error('Unexpected error'));

        await categoriesController.del(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });

});
