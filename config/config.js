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
    name: process.env.DB_NAME || 'hackatex',
    port: process.env.DB_PORT || 3306,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'toor'
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

module.exports = config;
