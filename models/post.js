'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {

    static associate(models) {
      Post.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
      Post.belongsToMany(models.Tag, {
        through: 'PostTag',
        foreignKey: 'postId',
        otherKey: 'tagId',
        as: 'tags'
      });
      Post.hasMany(models.Comment, {
        foreignKey: 'postId',
        as: 'comments'
      });
      Post.hasMany(models.Post_Image, {
        foreignKey: 'postId',
        as: 'images'
      });
    }
  }
  Post.init({
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    post_imagesId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};