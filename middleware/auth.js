import jwt from 'jsonwebtoken';
import Student from '../models/student.js';

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await Student.findByPk(decoded.id);
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

export const requireRole = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: "Authentication required" });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ 
                message: "You don't have permission to access this resource" 
            });
        }

        next();
    };
};

// File upload middleware
export const allowedFileTypes = (types) => {
    return (req, res, next) => {
        if (!req.file) {
            return next();
        }

        const fileType = req.file.mimetype;
        if (!types.includes(fileType)) {
            return res.status(400).json({ 
                message: `Invalid file type. Allowed types: ${types.join(', ')}` 
            });
        }

        next();
    };
};
