'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Post_Images', [
      {
        postId: 1,
        URL: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=60',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        postId: 1,
        URL: 'https://images.unsplash.com/photo-1780754001443-d706281f4e16?auto=format&fit=crop&w=800&q=60',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        postId: 2,
        URL: 'https://images.unsplash.com/photo-1780666389598-f70248dc8c42?auto=format&fit=crop&w=800&q=60',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        postId: 2,
        URL: 'https://images.unsplash.com/photo-1780672823738-2a8d15d79aaf?auto=format&fit=crop&w=800&q=60',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Post_Images', null, {});
  }
};
