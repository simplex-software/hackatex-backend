const app = require('./app');
const sequelize = require('./src/utils/database');
const expressSwagger = require('express-swagger-generator')(app);
const { config, swagger } = require('./config');

sequelize
  .sync()
  .then(() => {
    console.log('Connected to database.');

    if (config.app.env == 'dev') {
      expressSwagger(swagger);
    }
    app.listen(config.app.port, () => {
      console.log(`App running on port ${config.app.port}`);
    });
  })
  .catch(err => console.log(err));