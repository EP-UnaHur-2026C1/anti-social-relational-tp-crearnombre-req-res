'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostTag extends Model {

    static associate(models) {
      // define association here
    }
  }
  PostTag.init({
    PostId: DataTypes.INTEGER,
    TagId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PostTag',
  });
  return PostTag;
};