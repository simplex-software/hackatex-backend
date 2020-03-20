const createPassword = require('../helpers/create-password');

module.exports = [{
    username: 'admin',
    password: createPassword('admin'),
    name: 'Admin',
    email: 'admin@example.com',
}];