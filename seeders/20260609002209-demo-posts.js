'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Posts', [
      {
        descripcion: 'Mi primer post',
        fecha: new Date(),
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        descripcion: 'Viaje a la playa',
        fecha: new Date(),
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        descripcion: 'Receta de pasta',
        fecha: new Date(),
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        descripcion: 'Mi experiencia en el gimnasio',
        fecha: new Date(),
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Posts', null, {});
  }
};
