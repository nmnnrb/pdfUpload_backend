const app = require('./app');
const { sequelize } = require('./config/database');

const PORT = process.env.PORT || 8080;

(async () => {
  try {
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
})();
