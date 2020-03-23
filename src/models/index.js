'use strict';
const Category = require('./category');
const Event = require('./event');

Event.belongsTo(Category, { foreignKey: 'category_id' });
Category.hasMany(Event);

module.exports = {
  Category: Category,
  Event: Event,
};