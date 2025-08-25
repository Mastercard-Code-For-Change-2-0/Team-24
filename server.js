


require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http"); // Make sure this is here

const sequelize = require("./config/database.js");
const Student = require("./models/student");
const studentroutes = require("./routes/authroutes.js");
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : ["http://localhost:5173", "http://localhost:3000"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["set-cookie"],
  })
);

// Routes
app.get("/", (req, res) => {
  res.send("🚀 App API is running...");
});

//app.use('/api/users', userRoutes);
app.use('/api/students', studentRoutes);

// *Create HTTP server here*
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

// Sync DB & start server
sequelize
  .sync({ alter: true }) // auto-create/update tables
  .then(() => {
    console.log("✅ Database connected & synced");
    server.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect DB:", err);
  });