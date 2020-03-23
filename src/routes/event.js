'use strict';

const express = require('express');

const router = express.Router();
const { EventController } = require('../controllers');

 /**
 * @typedef GetEventsResponse
 * @property { boolean } success - true
 * @property { Array.<Event> } events - Events list
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
 * Get events endpoint
 * @route GET /api/v1/events
 * @group Category
 * @param { integer } page.query - Page number
 * @param { string }  search.query - Search keyword
 * @returns { GetEventsResponse } 200 - OK
 * @returns { Error.model }  500 - Unexpected error
 */
router.get('/', EventController.getEvents);

module.exports = router;