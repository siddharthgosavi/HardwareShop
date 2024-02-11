// models/Category.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Category = sequelize.define(
  "Category",
  {
    category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    material_category: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    timestamps: false,
    tableName: "Categories"
  }
);

module.exports = Category;
