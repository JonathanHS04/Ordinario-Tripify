
//tripsModel.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/postgresdb');

const Trip = sequelize.define('Trip', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  locationId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  startedDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('active', 'completed', 'cancelled'),
    allowNull: false,
    defaultValue: 'active'
  }
});

module.exports = Trip;