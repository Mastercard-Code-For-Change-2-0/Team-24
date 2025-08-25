import express from 'express';
import multer from 'multer';
import { register, login } from '../controllers/authcontroller.js';
import { 
    getProfile, 
    updateProfile, 
    bulkCreateStudents, 
    getAllStudents, 
    getAllClerks 
} from '../controllers/userController.js';
import { verifyToken, requireRoles } from '../middleware/roleAuth.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'text/csv') {
            cb(null, true);
        } else {
            cb(new Error('Only CSV files are allowed'));
        }
    }
});

// Public routes for role selection and authentication
router.get('/roles', (req, res) => {
    res.json(['student', 'clerk', 'admin']);
});

// Login routes
router.post('/login', login); // General login
router.post('/admin/login', login); // Admin-specific login route
router.post('/students/login', login); // Student-specific login route
router.post('/clerk/login', login); // Clerk-specific login route

// Student registration (public route)
router.post('/students/register', (req, res, next) => {
    req.body.role = 'student';
    next();
}, register);

// Role-specific registration (protected routes)
router.post('/register/:role', verifyToken, requireRoles(['admin']), (req, res, next) => {
    const role = req.params.role;
    if (!['clerk', 'admin'].includes(role)) {
        return res.status(400).json({ message: "Invalid role" });
    }
    req.body.role = role;
    next();
}, register);

// Login route
router.post('/login', login);

// Protected routes - require authentication
router.use(verifyToken);

// Role-specific registration routes
router.post('/register/clerk', requireRoles(['admin']), (req, res, next) => {
    req.body.role = 'clerk';
    next();
}, register);

// Admin-only routes
router.get('/users', requireRoles(['admin']), async (req, res) => {
    try {
        const users = await Student.findAll({
            attributes: { exclude: ['password'] }
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users" });
    }
});

// Update user profile - available to all authenticated users
router.put('/profile', async (req, res) => {
    try {
        const allowedUpdates = ['contact', 'address', 'profile_picture', 'skills', 'education'];
        const updates = Object.keys(req.body)
            .filter(key => allowedUpdates.includes(key))
            .reduce((obj, key) => {
                obj[key] = req.body[key];
                return obj;
            }, {});

        await req.user.update(updates);
        res.json({ 
            message: "Profile updated successfully",
            user: req.user 
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get user profile
router.get('/profile', (req, res) => {
    const { password, ...userWithoutPassword } = req.user.toJSON();
    res.json(userWithoutPassword);
});

export default router;
