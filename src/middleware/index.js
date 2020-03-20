'use strict';

const jwt = require('./jwt');

module.exports = {
  auth: jwt.verify
};