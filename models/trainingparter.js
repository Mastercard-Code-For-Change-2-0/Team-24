const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TrainingPartner = sequelize.define('TrainingPartner', {
  tp_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  tp_name: {
    type: DataTypes.STRING(50),
    allowNull: true
  }
}, {
  tableName: 'training_partner',
  timestamps: false
});

module.exports = TrainingPartner;