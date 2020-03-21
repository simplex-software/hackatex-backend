'use strict';

const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Event = sequelize.define('event', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true
  },
  image: {
    type: Sequelize.STRING,
    allowNull: true
  },
  start_date: {
    type: Sequelize.DATE,
    allowNull: false
  },
  duration: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  link: {
    type: Sequelize.STRING,
    allowNull: true
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
},
{
    tableName: 'events',
    underscored: true,
    timestamps: true
});

module.exports = Event;
