import express from 'express';
import { register, login } from '../controllers/authcontroller.js';
import { verifyToken, requireRoles } from '../middleware/roleAuth.js';

const router = express.Router();

// Public routes for registration
router.post('/register', register); // Default student registration

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
