'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Posts', [
      {
        titulo: 'Mi primer post',
        contenido: 'Este es el contenido de mi primer post.',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        titulo: 'Viaje a la playa',
        contenido: 'Disfruté mucho mi viaje a la playa el fin de semana pasado.',
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      , {
        titulo: 'Receta de pasta',
        contenido: 'Aquí les comparto mi receta favorita de pasta con salsa de tomate.',
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      , {
        titulo: 'Mi experiencia en el gimnasio',
        contenido: 'He estado yendo al gimnasio regularmente y me siento mucho mejor.',
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Posts', null, {});
  }
};
