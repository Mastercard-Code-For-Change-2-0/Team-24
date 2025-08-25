const { Sequelize } = require('sequelize');
require('dotenv').config();

const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT || 5432;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASSWORD;  // Changed from DB_PASS to DB_PASSWORD to match common .env convention
const DB_NAME = process.env.DB_NAME;
const DB_DIALECT = process.env.DB_DIALECT || 'postgres';

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: DB_DIALECT,
  logging: false,
  define: {
    timestamps: true, // Enable timestamps by default for all models
    underscored: true // Use snake_case instead of camelCase for column names
  }
});

// Test connection function
const testDBConnection = async () => {
  try {
    console.log(DB_PASS);
    await sequelize.authenticate();
    console.log(`✅ Connected to ${DB_DIALECT} database at ${DB_HOST}:${DB_PORT}`);
    return true;
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    return false;
  }
};

// Export the sequelize instance as default export
module.exports = sequelize;

// Export test function separately if needed
module.exports.testDBConnection = testDBConnection;

