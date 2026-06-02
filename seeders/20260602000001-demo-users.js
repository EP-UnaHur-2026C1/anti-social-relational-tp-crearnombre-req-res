'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        nickname: 'juan',
        nombre: 'Juan',
        apellido: 'Perez',
        fecha_nacimiento: '1995-03-15',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nickname: 'maria',
        nombre: 'Maria',
        apellido: 'Garcia',
        fecha_nacimiento: '1998-07-22',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nickname: 'pedro',
        nombre: 'Pedro',
        apellido: 'Lopez',
        fecha_nacimiento: '2000-01-10',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nickname: 'laura',
        nombre: 'Laura',
        apellido: 'Martinez',
        fecha_nacimiento: '1993-11-05',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nickname: 'carlos',
        nombre: 'Carlos',
        apellido: 'Rodriguez',
        fecha_nacimiento: '2001-09-30',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
