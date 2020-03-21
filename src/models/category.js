'use strict';

const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Category = sequelize.define('category', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: Sequelize.STRING,
  description: {
    type: Sequelize.STRING,
    allowNull: true
  },
  image: {
    type: Sequelize.STRING,
    allowNull: true
  }
},
{
    tableName: 'categories',
    underscored: true,
    timestamps: false
});

module.exports = Category;
