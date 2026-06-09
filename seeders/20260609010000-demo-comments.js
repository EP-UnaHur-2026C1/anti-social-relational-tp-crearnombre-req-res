'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Comments', [
      {
        descripcion: 'Este es un comentario nuevo y visible',
        visible: true,
        fecha: new Date(),
        userId: 1,
        postId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        descripcion: 'Comentario viejo y visible',
        visible: true,
        fecha: new Date('2025-01-01'),
        userId: 2,
        postId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        descripcion: 'Comentario viejo y no visible',
        visible: false,
        fecha: new Date('2025-01-01'),
        userId: 3,
        postId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        descripcion: 'Comentario reciente y no visible',
        visible: false,
        fecha: new Date(),
        userId: 4,
        postId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Comments', null, {});
  }
};
