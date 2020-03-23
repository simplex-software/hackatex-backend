const Sequelize = require('sequelize');

const { config } = require('../../config');

const dbConfig = config.database; 

const sequelize = new Sequelize(dbConfig.name, dbConfig.username, dbConfig.password, {
  dialect: 'mysql',
  host: dbConfig.host,
  port: dbConfig.port,
  logging: false
});

module.exports = sequelize;