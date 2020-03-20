const bcrypt = require('bcrypt');

const PASSWORD_ROUNDS = 12;

module.exports = password => {
  return bcrypt.hashSync(password, PASSWORD_ROUNDS);
};