import express from 'express';
import multer from 'multer';
import { register, login } from '../controllers/authcontroller.js';
import { verifyToken, requireRole, allowedFileTypes } from '../middleware/auth.js';

const router = express.Router();

// File upload configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Public routes
router.post('/students/register', (req, res, next) => {
    req.body.role = 'student';
    next();
}, register);

router.post('/students/login', login);

router.post('/clerk/register', verifyToken, requireRole(['admin']), (req, res, next) => {
    req.body.role = 'clerk';
    next();
}, register);

router.post('/login', login);

// Protected routes with file upload
router.post('/upload-documents', 
    verifyToken, 
    allowedFileTypes(['application/pdf', 'image/jpeg', 'image/png']),
    upload.single('document'),
    (req, res) => {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        res.json({ 
            message: "File uploaded successfully",
            file: req.file 
        });
    }
);

// Profile routes
router.get('/profile', verifyToken, (req, res) => {
    res.json({ user: req.user });
});

// Admin only routes
router.get('/users', verifyToken, requireRole(['admin']), async (req, res) => {
    try {
        const users = await Student.findAll({
            attributes: { exclude: ['password'] }
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users" });
    }
});

export default router;
