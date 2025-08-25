// server.js
require("dotenv").config();
const express = require("express");

require('dotenv').config();
// Database
const cookieParser = require('cookie-parser');
const sequelize = require("./config/database");
const { syncDB } = require('./models');


const app = express();
app.use(express.json());  // To handle JSON payloads
app.use(cookieParser())
//const PORT = process.env.PORT || 5000;
const cors = require("cors");

// CORS configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS 
? process.env.ALLOWED_ORIGINS.split(',') 
: ["http://localhost:5173", "http://localhost:3000"];

const corsOptions = {
    origin: allowedOrigins,
    credentials: true, // Allow credentials (cookies)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['set-cookie']
};

const server = http.createServer(app);

app.use(cors(corsOptions));
// Middleware
//app.use(cors());
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
(async () => {
    await syncDB();
})();
// Routes
app.get("/", (req, res) => {
  res.send("🚀App API is running...");
});

const PORT = process.env.PORT || 3000;

sequelize.sync()
  .then(() => {
    console.log("✅ Database connected & synced");
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect DB:", err);
  });
