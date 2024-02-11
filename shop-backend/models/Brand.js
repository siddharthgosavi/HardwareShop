// models/Brand.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Brand = sequelize.define(
  "Brand",
  {
    brand_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    brand_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    timestamps: false,
    tableName: "Brands"
  }
);

module.exports = Brand;
