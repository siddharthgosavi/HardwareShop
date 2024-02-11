// models/CategoryInventory.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Category = require("./Category");

const CategoryInventory = sequelize.define(
  "CategoryInventory",
  {
    category_inventory_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Category,
        key: "category_id"
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
    tableName: "CategoryInventory"
  }
);

module.exports = CategoryInventory;
