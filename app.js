const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const { CategoryRouter } = require('./src/routes');
const { auth } = require('./src/middleware');

const { Category } = require('./src/models');

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
    error: err.message
  });
});

module.exports = app;