'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Follower extends Model {

    static associate(models) {
    }
  }
  Follower.init({
    seguidorId: {
      type: 
      DataTypes.INTEGER,
      allowNull: false
    },
    seguidoId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Follower',
  });
  return Follower;
};