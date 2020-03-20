const dotenv = require('dotenv');

dotenv.config();

const config = {
  app: {
    env: process.env.APP_ENV || 'dev',
    host: process.env.APP_HOST || 'localhost',
    port: process.env.APP_PORT || 3000,
    dir: process.env.APP_DIR || '/app',
  },
  docker: {
    port: process.env.DOCKER_HOST_PORT || 3000,
  },
  database: {
    host: process.env.DB_HOST || 'localhost',
    name: process.env.DB_NAME || 'demo',
    port: process.env.DB_PORT || 27017
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'jwtSecret'
  },
  test: {
    database: {
      name: process.env.TEST_DATABASE || 'test'
    }
  }
};

const database = config.database;

// Set connection url to use in different places
config.database.uri = `mongodb://${database.host}:${database.port}/${database.name}`

// Test database
config.test.database.uri = `mongodb://${database.host}:${database.port}/${config.test.database.name}`

module.exports = config;
