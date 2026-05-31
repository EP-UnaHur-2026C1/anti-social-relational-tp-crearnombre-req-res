'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      User.hasMany(models.Post, {
        foreignKey: 'userId',
        as: 'posts'
      });
      User.hasMany(models.Comment, {
        foreignKey: 'userId',
        as: 'comments'
      });
      // falta unitaria
    }
  }
  User.init({
    nickname: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fecha_nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};