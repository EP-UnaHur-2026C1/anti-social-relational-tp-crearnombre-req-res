"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      // Un post pertenece a un único usuario
      Post.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });

      // Un post puede tener muchas etiquetas (tags)
      Post.belongsToMany(models.Tag, {
        through: "PostTag",
        foreignKey: "postId",
        otherKey: "tagId",
        as: "tags",
      });

      // Un post tiene muchos comentarios
      Post.hasMany(models.Comment, {
        foreignKey: "postId",
        as: "comments",
        onDelete: "CASCADE",
      });

      // Un post tiene muchas imágenes (pueden ser 0, 1 o varias)
      Post.hasMany(models.Post_Image, {
        foreignKey: "postId",
        as: "images",
        onDelete: "CASCADE",
      });
    }
  }

  Post.init(
    {
      descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Post",
    },
  );
  return Post;
};
