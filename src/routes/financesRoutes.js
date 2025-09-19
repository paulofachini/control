const { Router } = require('express');
const { getFinances } = require('../controllers/financesController');
const router = Router();

router.get('/', getFinances);

module.exports = router;
