
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/userRoutes.js";
import sequelize from "./config/database.js";
import Student from "./models/student.js";

const app = express();
dotenv.config();
// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : ["http://localhost:5173", "http://localhost:3000"];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true, // Allow credentials (cookies)
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["set-cookie"],
};

app.use(cors(corsOptions));
// API routes
app.use("/api", userRouter);

// Initial DB sync with force:true in development
(async () => {
  try {
    await sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
    console.log('✅ Database synced successfully');
    
    // Create admin user if it doesn't exist
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
    console.error('❌ Error syncing database:', error);
  }
})();

// Routes
app.get("/", (req, res) => {
  res.send("🚀 App API is running...");
});

const PORT = process.env.PORT || 3000;

sequelize
  .sync()
  .then(() => {
    console.log("✅ Database connected & synced");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect DB:", err.message);
    console.error(err.stack);
  });