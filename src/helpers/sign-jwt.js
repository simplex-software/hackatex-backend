const jwt = require('jsonwebtoken');

const config = require('../../config/config');

module.exports = (name, email) => {
  return jwt.sign({
    name: name,
    email: email
  }, config.jwt.secret);
};