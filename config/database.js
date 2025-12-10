const path = require('path');
const { Sequelize } = require('sequelize');

const DB_PATH = path.join(__dirname, '..', 'data.sqlite');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: DB_PATH,
  logging: false,
});

module.exports = { sequelize, DB_PATH };
