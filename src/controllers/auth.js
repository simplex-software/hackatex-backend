const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

const { User } = require('../models');
const signJwt = require('../helpers/sign-jwt');

module.exports = {
  login: async (req, res, next) => {
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
      const msg = errors.array()[0].msg;
      const error = new Error(msg);
      error.statusCode = 401;
      return next(error);
    }

    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({ username: username });
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      const error = new Error(`Invalid username or password.`);
      error.statusCode = 401;
      return next(error);
    }

    const token = signJwt(user.name, user.email); 

    res.status(200).json({
      token: token
    })
  }
};