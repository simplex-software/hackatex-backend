const config = require('./config');

let options = {
  swaggerDefinition: {
    info: {
      description: '',
      title: 'Hackatex backend.',
      version: '1.0.0',
    },
    host: `${config.app.host}:${config.docker.port}`,
    basePath: '',
    produces: [
      "application/json",
      "application/xml"
    ],
    schemes: ['http'],
    tags: [
      {
        name: "Category",
        description: ""
      }
    ],
    securityDefinitions: {
      JWT: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        description: "Authorization token. e.g.: Bearer xxxx.xxxxx.xxxx",
      }
    }
  },
  basedir: config.app.dir,
  files: ['./src/routes/*.js']
};

module.exports = options;