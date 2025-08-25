const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  user_type: {
    type: DataTypes.ENUM('admin', 'clerical'),
    allowNull: true
  }
}, {
  tableName: 'user',
  timestamps: false
});

module.exports = User;