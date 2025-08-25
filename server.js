
<<<<<<< HEAD


require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http"); // Make sure this is here

const sequelize = require("./config/database.js");
const Student = require("./models/student");
const studentroutes = require("./routes/authroutes.js");
=======
import dotenv from "dotenv";
// const express = require("express");
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
// const cookieParser = require("cookie-parser");
// const cors = require("cors");
import { studentauthRouter } from "./routes/studentroutes.js";

// const sequelize = require("./config/database.js");
import sequelize from "./config/database.js";
// const Student = require("./models/student");
import Student from "./models/student.js";  // now works because we will create models/index.js

>>>>>>> d355d8034487568945b084390a0e52d345dac5db
const app = express();
dotenv.config();
// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : ["http://localhost:5173", "http://localhost:3000"];

<<<<<<< HEAD
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["set-cookie"],
  })
);
=======
const corsOptions = {
  origin: allowedOrigins,
  credentials: true, // Allow credentials (cookies)
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["set-cookie"],
};

app.use(cors(corsOptions));
app.use("/api/students", studentauthRouter);

// Initial DB sync
(async () => {
  await Student.sync();
})();
>>>>>>> d355d8034487568945b084390a0e52d345dac5db

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
<<<<<<< HEAD
    server.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
=======
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
>>>>>>> d355d8034487568945b084390a0e52d345dac5db
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect DB:", err.message);
    console.error(err.stack);
  });