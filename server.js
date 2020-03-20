const app = require('./app');
const expressSwagger = require('express-swagger-generator')(app);
const mongoose = require('mongoose');
const { config, swagger } = require('./config');

mongoose.connect(config.database.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
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
