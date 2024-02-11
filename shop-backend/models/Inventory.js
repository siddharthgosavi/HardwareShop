// models/Inventory.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Material = require("./Material");

const Inventory = sequelize.define(
  "Inventory",
  {
    inventory_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    material_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Material,
        key: "material_id"
      }
    },
    in_stock: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    required_stock: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    timestamps: false,
    tableName: "Inventory"
  }
);

module.exports = Inventory;
