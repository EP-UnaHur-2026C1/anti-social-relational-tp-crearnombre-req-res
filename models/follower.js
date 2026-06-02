"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Follower extends Model {
    static associate(models) {
      Follower.belongsTo(models.User, {
        foreignKey: "seguidorId",
        as: "seguidor",
      });
      Follower.belongsTo(models.User, {
        foreignKey: "seguidoId",
        as: "seguido",
      });
    }
  }
  Follower.init(
    {
      seguidorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      seguidoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Follower",
      indexes: [
        {
          unique: true,
          fields: ["seguidorId", "seguidoId"],
        },
      ],
    },
  );
  return Follower;
};
