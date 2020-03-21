'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('categories', {
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
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('categories');
  }
};
