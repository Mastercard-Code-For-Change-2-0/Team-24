import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import bcrypt from 'bcryptjs';
import TrainingPartner from './trainingparter.js';

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
      min: 2000, // Assuming batch year won't be before 2000
      max: new Date().getFullYear() + 1, // Allowing next year's batch
    },
  },
  role: {
    type: DataTypes.ENUM('student', 'clerk', 'admin'),
    defaultValue: 'student',
    allowNull: false
  },
  tp_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: TrainingPartner,
      key: 'tp_id'
    }
  },
  contact_info: {
    allowNull: true,
    type: DataTypes.STRING(13),
    unique: true
  },



},{
   tableName :'Student'
   ,timestamps: true

});

// Hash password before saving
Student.beforeCreate(async (student) => {
  if (student.password) {
    const salt = await bcrypt.genSalt(10);
    student.password = await bcrypt.hash(student.password, salt);
  }
});

export default Student;