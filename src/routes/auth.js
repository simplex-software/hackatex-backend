'use strict';

const express = require('express');
const { check, body } = require('express-validator');

const router = express.Router();
const { AuthController } = require('../controllers');
const { User } = require('../models');

/**
 * @typedef LoginRequest
 * @property {string} username.required - Username
 * @property {string} password.required - Password
 */

/**
 * @typedef LoginResponse
 * @property {string} token - JWT string
 */

/**
 * @typedef Error
 * @property {string} error - Message error
 */

/**
 * Login endpoint
 * @route POST /api/v1/auth/login
 * @group Auth - Authentication
 * @param { LoginRequest.model } login.body.required - Login request
 * @returns { LoginResponse.model } 200 - Return a JWT token
 * @returns { Error.model } 401 - Unauthorized user
 * @returns { Error.model }  500 - Unexpected error
 */
router.post('/login', [
  body('username')
    .custom((value, { req }) => {
      return User.findOne({ username: value })
        .then(user => {
          if (!user) {
            return Promise.reject(
              `Invalid username or password.`
            );
          }
        });
    }),
  body('password', `Invalid username or password.`)
    .isLength({ min: 5 })
    .isAlphanumeric()
    .trim()
],
  AuthController.login
);

module.exports = router;