const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const { CategoryRouter, EventRouter } = require('./src/routes');

/**
 * Use bodyParser to process requests
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1/categories', CategoryRouter);
app.use('/api/v1/events', EventRouter);

app.use((err, req, res, next) => {
  let statusCode = 500;
  if (err.statusCode) {
    statusCode = err.statusCode;
  }

  res.status(statusCode).json({
    success: false,
    error: err.message
  });
});

module.exports = app;