'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Posttags', [
      {
        postId: 1,
        tagId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        postId: 1,
        tagId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        postId: 2,
        tagId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        postId: 3,
        tagId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        postId: 4,
        tagId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Posttags', null, {});
  }
};
