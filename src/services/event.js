'use strict';

const PAGE_SIZE = 10;

const { Category } = require('../models');
const DateFormatter = require('../helpers/DateFormatter');

class EventService {
  async getAllByCategoryId(categoryId, page = 1) 
  {
    const category = await Category.findByPk(categoryId);
    if (!category) {
      const error = new Error('Invalid category.');
      error.statusCode = 400;
      throw error;
    }
    const skip = page == 1 ? 0 : page - 1;
    const events = await category.getEvents({ 
      offset: skip * PAGE_SIZE, 
      limit: PAGE_SIZE,
      raw: true
    });

    return events.map(event => {
      const date = event.start_date;
      const created = event.createdAt;
      delete event.categoryId;
      delete event.updatedAt;
      delete event.createdAt;
      return {  
        ...event,
        start_date: DateFormatter.formatDate(date),
        start_time: DateFormatter.formatTime(date),
        added: DateFormatter.formatDateTime(created)
      }
    });
  }
}

module.exports = EventService;