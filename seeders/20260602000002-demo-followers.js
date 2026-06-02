'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Followers', [
      { seguidorId: 1, seguidoId: 2, createdAt: new Date(), updatedAt: new Date() },
      { seguidorId: 1, seguidoId: 3, createdAt: new Date(), updatedAt: new Date() },
      { seguidorId: 2, seguidoId: 1, createdAt: new Date(), updatedAt: new Date() },
      { seguidorId: 3, seguidoId: 1, createdAt: new Date(), updatedAt: new Date() },
      { seguidorId: 4, seguidoId: 1, createdAt: new Date(), updatedAt: new Date() },
      { seguidorId: 4, seguidoId: 2, createdAt: new Date(), updatedAt: new Date() },
      { seguidorId: 5, seguidoId: 2, createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Followers', null, {});
  },
};
