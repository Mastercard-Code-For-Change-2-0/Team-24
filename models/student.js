import { Sequelize, DataTypes } from 'sequelize';
import db from '../config/database.js';
import bcrypt from 'bcryptjs';

const Student = db.define('Student', {
  id: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true 
  },  
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
    allowNull: false,
    validate: {
      len: [6, 100],
    },
  },
  batch: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: true,
      min: 2000,
      max: new Date().getFullYear() + 1,
    },
  },
  role: {
    type: DataTypes.ENUM('student', 'clerk', 'admin'),
    defaultValue: 'student',
    allowNull: false
  },
  // Additional fields that can be updated later in dashboard
  contact: {
    type: DataTypes.STRING(13),
    allowNull: true,
    unique: true
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true
  },
  profile_picture: {
    type: DataTypes.STRING,
    allowNull: true
  },
  skills: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  education: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  }
}, {
  tableName: 'students',
  timestamps: true
});

// Hash password before saving
Student.beforeCreate(async (student) => {
  if (student.password) {
    const salt = await bcrypt.genSalt(10);
    student.password = await bcrypt.hash(student.password, salt);
  }
});

export default Student;