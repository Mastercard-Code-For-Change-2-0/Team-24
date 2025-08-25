const express = require("express");
//const Authenticate = require("../middlewares/authMiddleware");
const multer = require("multer"); // Make sure this is correctly imported


const router = express.Router();

const studentController = require("../controllers/studentController");

router.post("/register", studentController.registerAdmin);
router.post("/login", studentController.loginAdmin);

module.exports = router;