'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('categories', [
      { name: 'Tecnología' },
      { name: 'Salud' },
      { name: 'Música' },
      { name: 'Teatro' },
      { name: 'Juegos' },
      { name: 'Lectura' },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('categories', null, {});
  }
};
