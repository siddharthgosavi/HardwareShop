// models/Material.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Category = require("./Category");
const Unit = require("./Unit");
const Brand = require("./Brand");

const Material = sequelize.define(
  "Material",
  {
    material_id: {
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
    material_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    unit_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Unit,
        key: "unit_id"
      }
    },
    size_inches: {
      type: DataTypes.FLOAT
    },
    type: {
      type: DataTypes.STRING
    },
    diameter: {
      type: DataTypes.FLOAT
    },
    color: {
      type: DataTypes.STRING
    },
    brand_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Brand,
        key: "brand_id"
      }
    },
    image: {
      type: DataTypes.STRING
    }
  },
  {
    timestamps: false,
    tableName: "Materials"
  }
);

module.exports = Material;
