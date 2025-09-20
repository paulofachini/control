const express = require('express');
const app = express();
const financesRouter = require('./routes/financesRoutes');
const categoriesRouter = require('./routes/categoriesRoutes');

app.use(express.json());

app.use('/finances', financesRouter);
app.use('/categories', categoriesRouter);

module.exports = app;
