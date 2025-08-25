
require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");


const sequelize = require("./config/database.js");
const Student = require("./models/student");  // now works because we will create models/index.js

const app = express();

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

// HTTP server


// Initial DB sync
(async () => {
  await Student.sync();
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
    server.listen(PORT, () => {
      console.log("Server running at http://localhost:${PORT}");
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect DB:", err);
  });