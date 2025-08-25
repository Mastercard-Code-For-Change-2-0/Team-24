const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Student = require('./student');

const Certification = sequelize.define('Certification', {
  certificate_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  certificate_type: {
    type: DataTypes.STRING(30),
    allowNull: true
  },
  s_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Student,
      key: 's_id'
    }
  }
}, {
  tableName: 'certification',
  timestamps: false
});

// Association
Certification.belongsTo(Student, { foreignKey: 's_id' });

module.exports = Certification;