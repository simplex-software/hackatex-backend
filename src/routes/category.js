'use strict';

const express = require('express');

const router = express.Router();
const { CategoryController } = require('../controllers');

/**
 * @typedef GetCategoryResponse
 * @property { boolean } success - true
 * @property { Array.<Category> } categories - Categories list
 */

 /**
 * @typedef GetEventsByCategoryResponse
 * @property { boolean } success - true
 * @property { Array.<Event> } events - Events list
 */

/**
* @typedef Category
* @property { int } id - Category ID
* @property { string } name - Category name
*/

/**
* @typedef Event
* @property { int } id - Event ID
* @property { string } name - Event name
* @property { string } image - Event image name
* @property { string } start_date - Event starting date
* @property { string } start_time - Event starting time
* @property { int } duration - Event duration in minutes
* @property { string } link - Event link
* @property { int } rating - Rating ID
* @property { int } category_id
* @property { string } added - Event creation date
*/

/**
 * @typedef Error
 * @property { boolean } success - false
 * @property { string } error - Message error
 */

/**
 * Get category endpoint
 * @route GET /api/v1/categories
 * @group Category
 * @returns { GetCategoryResponse } 200 - OK
 * @returns { Error.model }  500 - Unexpected error
 */
router.get('/', CategoryController.getCategories);

/**
 * Get events by category endpoint
 * @route GET /api/v1/categories/{id}/events
 * @group Category
 * @param { integer } id.path.required - Category ID
 * @returns { GetEventsByCategoryResponse } 200 - OK
 * @returns { Error.model }  500 - Unexpected error
 */
router.get('/:categoryId/events', CategoryController.getEventsByCategory);

module.exports = router;