const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Student = require('./student');

const Experience = sequelize.define('Experience', {
  exp_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  s_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Student,
      key: 's_id'
    }
  },
  location: {
    type: DataTypes.STRING(150)
  },
  JobRole: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  CompanyName: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  expYears: {
    type: DataTypes.INTEGER
  }
}, {
  tableName: 'experience',
  timestamps: false
});

// Association
Experience.belongsTo(Student, { foreignKey: 's_id' });

module.exports = Experience;