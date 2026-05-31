'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post_Image extends Model {
    static associate(models) {
      Post_Image.belongsTo(models.Post, {
        foreignKey: 'postId',
        as: 'post'
      });
    }
  }
  Post_Image.init({
    URL: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Post_Image',
  });
  return Post_Image;
};