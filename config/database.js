import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '..', '.env') });

// Default configuration
const config = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'nodefast',
    dialect: process.env.DB_DIALECT || 'postgres'
};

// Validate required fields
if (!config.password) {
    throw new Error('Database password is required. Set DB_PASSWORD in your .env file.');
}

if (!config.database) {
    throw new Error('Database name is required. Set DB_NAME in your .env file.');
}

// Log configuration (without sensitive data)
console.log('\nDatabase Configuration:');
console.log('----------------------');
console.log(`Host: ${config.host}`);
console.log(`Port: ${config.port}`);
console.log(`User: ${config.username}`);
console.log(`Database: ${config.database}`);
console.log(`Dialect: ${config.dialect}\n`);

const sequelize = new Sequelize({
    host: config.host,
    port: config.port,
    username: config.username,
    password: config.password,
    database: config.database,
    dialect: config.dialect,
    dialect: config.dialect,
    logging: console.log,  // Enable logging to debug connection issues
    define: {
        timestamps: true,
        underscored: true
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    dialectOptions: {
        ssl: process.env.DB_SSL === 'true' ? {
            require: true,
            rejectUnauthorized: false
        } : false
    }
});

// Test connection function
export const testDBConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log(`✅ Connected to ${DB_DIALECT} database at ${DB_HOST}:${DB_PORT}`);
    return true;
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    return false;
  }
};

// Export the sequelize instance as default
export default sequelize;

