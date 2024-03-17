const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Category = require("./Category");

const Vehicle = sequelize.define("Vehicle", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  image: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
  },
  seatNo: {
    type: DataTypes.INTEGER,
  },
  isAc: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

// Vehicle association
Vehicle.belongsTo(Category, {
  foreignKey: {
    allowNull: false,
  },
});

module.exports = Vehicle;
