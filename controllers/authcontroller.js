import bcrypt from 'bcryptjs';
import {z} from "zod";
import jwt from 'jsonwebtoken';
import {Students} from "../models/student.js";
import Students from "../models/student.js";
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(6, "Password must be 6 characters long")
});

function sign(user) {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '2d' });
}

const registerSchema = z.object({
  email: z.email(),
  name: z.string().min(1, "Name is required"),
  batch: z.number().int().min(2000).max(new Date().getFullYear() + 1),
  password: z.string().min(6, "Password must be at least 6 characters long")
});

export const register = async (req, res) => {
  try {
    const validatedData = registerSchema.parse(req.body);
    const user = await Students.create(validatedData);
    const token = sign(user);
    res.json({ 
      token, 
      user: { 
        id: user.id, 
        name: user.name, 
        email: user.email,
        batch: user.batch 
      } 
    });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return res.status(400).json({ message: "Validation error", errors: e.errors });
    }
    if (e.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: "Email already exists" });
    }
    res.status(400).json({ message: e.message });
  }
};

export const login = async (req, res) => {
    try {
        // Validate request body
        const validatedData = loginSchema.parse(req.body);
        
        // Find user by email
        const user = await Students.findOne({ where: { email: validatedData.email }});
        if (!user) {
            return res.status(400).json({message: "User with this email is not found"});
        }
        
        // Verify password
        const isPasswordValid = await bcrypt.compare(validatedData.password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({message: "Incorrect password"});
        }

        // Generate token
        const token = sign(user);
        
        // Send response
        res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                batch: user.batch
            }
        });
    } catch (e) {
        if (e instanceof z.ZodError) {
            return res.status(400).json({ message: "Validation error", errors: e.errors });
        }
        console.error('Login error:', e);
        res.status(500).json({message: "Internal Server error"});
    }
};


exports.register = async(req,res) =>{
    try{
        const{username,email,password} = req.body;
        const hashedPassword = await bcrypt.hash(password);
        const newstudent= await Students.create({
            username,
            email,
            password: hashedPassword
            
        });
        res.status(201).json({message:" registered successfully"});
    
    }
    catch(error){
        console.error("Error registering:",error);
        res.status(500).json({message:"Internal server error"});
    }
}
