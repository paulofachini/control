const finances = [
    { id: 1, description: 'Salário', amount: 5000, type: 'income' },
    { id: 2, description: 'Aluguel', amount: 1500, type: 'expense' },
];

const getAll = () => {
    return finances;
};

module.exports = {
    getAll,
};
