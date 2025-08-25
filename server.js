
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { mkdirSync } from 'fs';
import userRouter from "./routes/userRoutes.js";
import authRouter from "./routes/authroutes.js";
import sequelize from "./config/database.js";
import Student from "./models/student.js";
import adminRouter from "./routes/adminroutes.js";

const app = express();
dotenv.config();

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : ["http://localhost:5173"];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["set-cookie"],
};

app.use(cors(corsOptions));

// Mount routes
app.use('/api', authRouter);
app.use('/api', userRouter);
app.use('/api/admin', adminRouter);

// Create uploads directory if it doesn't exist
try {
    mkdirSync('./uploads', { recursive: true });
} catch (err) {
    console.log('Uploads directory already exists');
}

// Routes
app.get("/", (req, res) => {
    res.send("🚀 App API is running...");
});

// Initialize database function
async function initDb() {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connection successful');

        await sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
        console.log('✅ Database models synchronized');

        const adminExists = await Student.findOne({ where: { role: 'admin' } });
        if (!adminExists && process.env.NODE_ENV === 'development') {
            await Student.create({
                name: 'Admin User',
                email: 'admin@admin.com',
                password: 'admin123',
                batch: 2023,
                role: 'admin'
            });
            console.log('✅ Admin user created');
        }
    } catch (error) {
        console.error('❌ Database initialization error:', error);
        throw error; // Re-throw to be caught by startApp
    }
}

// Start application function
async function startApp() {
    const port = process.env.PORT || 3000;
  
    try {
        await initDb();
        app.listen(port, () => console.log(`\n🚀 Server running on http://localhost:${port}`));
    } catch (error) {
        console.error('❌ Application startup failed:', error);
        process.exit(1);
    }
}

// Export for testing
export { app, startApp };

// Start the application
startApp();