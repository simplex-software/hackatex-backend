const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const { CategoryRouter } = require('./src/routes');

const { Category, Event } = require('./src/models');

Event.belongsTo(Category, { foreignKey: 'category_id' });
Category.hasMany(Event);

/**
 * Use bodyParser to process requests
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1/categories', CategoryRouter);

app.use((err, req, res, next) => {
  let statusCode = 500;
  if (err.statusCode) {
    statusCode = err.statusCode;
  }

  res.status(statusCode).json({
    status: false,
    error: err.message
  });
});

module.exports = app;