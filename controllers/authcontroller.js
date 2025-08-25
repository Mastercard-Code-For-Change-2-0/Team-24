import bcrypt from 'bcryptjs';
import {z} from "zod";
import jwt from 'jsonwebtoken';
import {Users} from "../models/student.js";

const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(6, "Password must be 6 characters long")
});

export const login = async (req, res) => {
    try {
        const {email, password} = loginSchema.parse(req.body);
        const user = await Users.findByEmail(email);
        if (!user) return res.status(400).json({message: "User with this email is not present."});
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({message: "Incorrect Password."});

        const token = jwt.sign({sub: user.id, role: user.role}, process.env.JWT_SECRET, {expiresIn: "1h"});
        res.json({token});
    } catch {
        res.status(500).json({message: "Internal Server error."});
    }
};