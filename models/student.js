const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');
const bcrypt = require('bcryptjs');

const Student = sequelize.define('Student', {
   id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },  
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
 
  
  password: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: [8, 100],
    },
  },
  
  batch: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: true,
      min: 2000, // Assuming batch year won't be before 2000
      max: new Date().getFullYear() + 1, // Allowing next year's batch
    },
  },
  
  
  
  
},{
   tableName :'Student'
   ,timestamps: true

});


module.exports = Student;