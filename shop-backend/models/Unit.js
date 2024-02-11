// models/Unit.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Unit = sequelize.define(
  "Unit",
  {
    unit_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    unit_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    timestamps: false,
    tableName: "Units"
  }
);

module.exports = Unit;
