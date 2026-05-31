'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {

    static associate(models) {
      Comment.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
      Comment.belongsTo(models.Post, {
        foreignKey: 'postId',
        as: 'post'
      });
    }
  }
  Comment.init({
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    visible: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};