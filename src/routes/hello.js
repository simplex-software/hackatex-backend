'use strict';

const express = require('express');

const router = express.Router();
const { HelloController } = require('../controllers');

/**
 * @typedef HelloResponse
 * @property {string} message - Hello, World!
 */

/**
 * @typedef Error
 * @property {string} error - Message error
 */

/**
 * Hello endpoint
 * @route GET /api/v1/hello
 * @group Example
 * @returns { HelloResponse.model } 200
 * @returns { Error.model } 401 - Unauthorized user
 * @returns { Error.model }  500 - Unexpected error
 * @security JWT
 */
router.get('/hello', HelloController.hello);

module.exports = router;