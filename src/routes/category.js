'use strict';

const express = require('express');

const router = express.Router();
const { CategoryController } = require('../controllers');

/**
 * @typedef GetCategoryResponse
 * @property {boolean} success - true/false
 * @property { Array.<Category> } categories - Categories list
 */


/**
* @typedef Category
* @property {int} id - Category ID
* @property {string} name - Category name
*/

/**
 * @typedef Error
 * @property {boolean} success - true/false
 * @property {string} error - Message error
 */

/**
 * Get category endpoint
 * @route GET /api/v1/categories
 * @group Category
 * @returns { GetCategoryResponse } 200
 * @returns { Error.model }  500 - Unexpected error
 */
router.get('/', CategoryController.getCategories);

module.exports = router;