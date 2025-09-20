const categoriesService = require('../services/categoriesService');

async function create(req, res) {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }
        const category = await categoriesService.createCategory(name);
        res.status(201).json(category);
    } catch (error) {
        if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
            return res.status(409).json({ error: 'Category with this name already exists' });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function get(req, res) {
    try {
        const categories = await categoriesService.getCategories();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getById(req, res) {
    try {
        const { id } = req.params;
        const category = await categoriesService.getCategoryById(id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function update(req, res) {
    try {
        const { id } = req.params;
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }
        const updatedCategory = await categoriesService.updateCategory(id, name);
        if (!updatedCategory) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function del(req, res) {
    try {
        const { id } = req.params;
        const deleted = await categoriesService.deleteCategory(id);
        if (!deleted) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(204).end(); // Responde com sucesso, mas sem conteúdo
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    create,
    get,
    getById,
    update,
    del,
};
