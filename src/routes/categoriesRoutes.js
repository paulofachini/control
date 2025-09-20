const { Router } = require('express');
const { create, get, update, del, getById } = require('../controllers/categoriesController');

const router = Router();

router.post('/', create);
router.get('/', get);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', del);

module.exports = router;