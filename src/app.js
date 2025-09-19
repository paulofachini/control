const express = require('express');
const app = express();
const financesRouter = require('./routes/financesRoutes');

app.use(express.json());
app.use('/finances', financesRouter);

module.exports = app;
