// server.js

require("dotenv").config();

const express = require("express");

const cookieParser = require("cookie-parser");

const cors = require("cors");

const http = require("http");



const sequelize = require("./config/database");



// Import models directly

require("./models/Student"); // Registers the Student model with Sequelize



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

  credentials: true, // Allow cookies

  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],

  allowedHeaders: ["Content-Type", "Authorization"],

  exposedHeaders: ["set-cookie"],

};



app.use(cors(corsOptions));



// HTTP server

const server = http.createServer(app);



// Routes

app.get("/", (req, res) => {

  res.send("🚀 App API is running...");

});



// Example route to create a student

app.post("/students", async (req, res) => {

  const Student = require("./models/Student");

  try {

    const student = await Student.create(req.body);

    res.status(201).json({ success: true, student });

  } catch (err) {

    res.status(400).json({ success: false, error: err.message });

  }

});



const PORT = process.env.PORT || 3000;



// Sync DB & start server

sequelize

  .sync({ alter: true }) // Auto-create/update tables for all imported models

  .then(() => {

    console.log("✅ Database connected & synced");

    server.listen(PORT, () => {

      console.log("Server running at http://localhost:${PORT}");

    });

  })

  .catch((err) => {

    console.error("❌ Failed to connect DB:", err);

  });