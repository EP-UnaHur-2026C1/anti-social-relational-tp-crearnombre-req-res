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
      
      Post.hasMany(models.Post_Image, {// no se si esta bien porque es 1 a 0..m, lei que se trata com el 1 a M pero aclaras que el id de post_images es opcional
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
    post_imagesId: { // porque es relacion 1 a 0..m, el id de post_images es opcional ???
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};