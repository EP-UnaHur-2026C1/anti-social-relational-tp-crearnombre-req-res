'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Tags', [
      { nombre: "hermoso", createdAt: new Date(), updatedAt: new Date() },
      { nombre: "campo", createdAt: new Date(), updatedAt: new Date() },
      { nombre: "ciudad", createdAt: new Date(), updatedAt: new Date() },
      { nombre: "playa", createdAt: new Date(), updatedAt: new Date() },
      { nombre: "arboles", createdAt: new Date(), updatedAt: new Date() },
      { nombre: "paisajes", createdAt: new Date(), updatedAt: new Date() },
      { nombre: "aestetic", createdAt: new Date(), updatedAt: new Date() },
      { nombre: "viaje", createdAt: new Date(), updatedAt: new Date() },
      { nombre: "comida", createdAt: new Date(), updatedAt: new Date() },
      { nombre: "moda", createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tags', null, {});
  }
};
