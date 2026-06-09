'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Tags', [
      {
        nombre: 'aestetic',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'paisajes',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'viaje',
        createdAt: new Date(),
        updatedAt: new Date(),
  },
      {
        nombre: 'comida',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'moda',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tags', null, {});
  }
};
