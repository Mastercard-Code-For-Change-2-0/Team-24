import bcrypt from 'bcryptjs';
import {z} from "zod";
import jwt from 'jsonwebtoken';
// import {Students} from "../models/student.js";
import Students from "../models/student.js";
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, "Password must be 6 characters long")
});

function sign(user) {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '2d' });
}

const registerSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1, "Name is required"),
  batch: z.number().int().min(2000).max(new Date().getFullYear() + 1),
  password: z.string().min(6, "Password must be at least 6 characters long")
});

export const register = async (req, res) => {
    const { logAction, logError, logRequest, logResponse } = await import('../utils/logger.js');
    logRequest(req);
    
    try {
        const validatedData = registerSchema.parse(req.body);
        
        // Add role from params or default to student
        const userData = {
            ...validatedData,
            role: req.body.role || 'student'
        };

        logAction('Creating new user', { role: userData.role, email: userData.email });

        // Create user
        const user = await Students.create(userData);
        
        // Generate token with role
        const token = jwt.sign(
            { 
                id: user.id, 
                role: user.role 
            }, 
            process.env.JWT_SECRET, 
            { expiresIn: '2d' }
        );

        const response = { 
            token, 
            user: { 
                id: user.id, 
                name: user.name, 
                email: user.email,
                batch: user.batch,
                role: user.role
            } 
        };

        logResponse(200, response);
        res.json(response);
    } catch (e) {
        if (e instanceof z.ZodError) {
            logError(e, { validation: e.errors });
            return res.status(400).json({ message: "Validation error", errors: e.errors });
        }
        if (e.name === 'SequelizeUniqueConstraintError') {
            logError(e, { email: req.body.email });
            return res.status(400).json({ message: "Email already exists" });
        }
        logError(e, { body: req.body });
        res.status(400).json({ message: e.message });
    }
};

export const login = async (req, res) => {
    const { logAction, logError, logRequest, logResponse } = await import('../utils/logger.js');
    logRequest(req);
    
    try {
        // Validate request body
        const validatedData = loginSchema.parse(req.body);
        
        // Find user by email and role
        const query = { 
            where: { 
                email: validatedData.email
            }
        };
        
        // If role is specified in the request, add it to the query
        if (req.body.role) {
            query.where.role = req.body.role;
            logAction('Role-specific login attempt', { role: req.body.role, email: validatedData.email });
        } else {
            logAction('General login attempt', { email: validatedData.email });
        }
        
        const user = await Students.findOne(query);
        
        if (!user) {
            const message = req.body.role 
                ? `No ${req.body.role} found with this email`
                : "User not found";
            logError(new Error(message), { email: validatedData.email });
            return res.status(400).json({ message });
        }
        
        // Verify password
        const isPasswordValid = await bcrypt.compare(validatedData.password, user.password);
        if (!isPasswordValid) {
            logError(new Error('Invalid password attempt'), { email: validatedData.email });
            return res.status(400).json({message: "Incorrect password"});
        }

        logAction('Successful login', { userId: user.id, role: user.role });

        // Generate token with role
        const token = jwt.sign(
            { 
                id: user.id, 
                role: user.role 
            }, 
            process.env.JWT_SECRET, 
            { expiresIn: '2d' }
        );
        
        // Prepare response
        const response = {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                batch: user.batch,
                role: user.role
            }
        };
        
        logResponse(200, response);
        res.json(response);
    } catch (e) {
        if (e instanceof z.ZodError) {
            logError(e, { validation: e.errors });
            return res.status(400).json({ message: "Validation error", errors: e.errors });
        }
        logError(e, { body: req.body });
        res.status(500).json({message: "Internal Server error"});
    }
};


// exports.register = async(req,res) =>{
//     try{
//         const{username,email,password} = req.body;
//         const hashedPassword = await bcrypt.hash(password);
//         const newstudent= await Students.create({
//             username,
//             email,
//             password: hashedPassword
            
//         });
//         res.status(201).json({message:" registered successfully"});
    
//     }
//     catch(error){
//         console.error("Error registering:",error);
//         res.status(500).json({message:"Internal server error"});
//     }
// }
