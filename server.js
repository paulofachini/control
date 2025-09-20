const app = require('./src/app');
const { runMigrations } = require('./src/database/runMigrations');
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await runMigrations();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
}

startServer();
