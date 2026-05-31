'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {

    static associate(models) {
      Tag.belongsToMany(models.Post, {
        through: 'PostTag',
        foreignKey: 'tagId',
        otherKey: 'postId',
        as: 'posts'
      });
    }
  }
  Tag.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Tag',
  });
  return Tag;
};