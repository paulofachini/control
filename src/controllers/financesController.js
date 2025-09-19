const financeService = require('../services/financesService');

const getFinances = (req, res) => {
    const finances = financeService.getAll();
    res.status(200).json(finances);
};

module.exports = {
    getFinances,
};
