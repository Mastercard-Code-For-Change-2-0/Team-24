import { z } from 'zod';
import Student from '../models/student.js';
import csv from 'csv-parser';
import fs from 'fs';
import bcrypt from 'bcryptjs';

// Schema for profile updates
const profileUpdateSchema = z.object({
    contact: z.string().nullable().optional(),
    address: z.string().nullable().optional(),
    profile_picture: z.string().nullable().optional(),
    skills: z.array(z.string()).optional(),
    education: z.array(
        z.object({
            degree: z.string(),
            institution: z.string(),
            year: z.number(),
            score: z.number().optional()
        })
    ).optional()
});

// Get student profile
export const getProfile = async (req, res) => {
    try {
        const user = await Student.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const { password, ...userWithoutPassword } = user.toJSON();
        res.json(userWithoutPassword);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update student profile
export const updateProfile = async (req, res) => {
    try {
        const validatedData = profileUpdateSchema.parse(req.body);
        await req.user.update(validatedData);
        const { password, ...updatedUser } = req.user.toJSON();
        res.json({
            message: "Profile updated successfully",
            user: updatedUser
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: "Validation error", errors: error.errors });
        }
        res.status(400).json({ message: error.message });
    }
};

// Bulk create students (Clerk only)
export const bulkCreateStudents = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "Please upload a CSV file" });
    }

    const results = [];
    const errors = [];

    fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', async (data) => {
            try {
                // Hash password
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(data.password || 'changeme123', salt);

                results.push({
                    name: data.name,
                    email: data.email,
                    batch: parseInt(data.batch),
                    password: hashedPassword,
                    role: 'student'
                });
            } catch (error) {
                errors.push({ row: data, error: error.message });
            }
        })
        .on('end', async () => {
            try {
                await Student.bulkCreate(results);
                fs.unlinkSync(req.file.path); // Clean up uploaded file
                res.json({
                    message: `Successfully created ${results.length} students`,
                    errors: errors.length ? errors : undefined
                });
            } catch (error) {
                res.status(400).json({
                    message: "Error creating students",
                    error: error.message,
                    failedRows: errors
                });
            }
        });
};

// Get all students (Admin and Clerk)
export const getAllStudents = async (req, res) => {
    try {
        const students = await Student.findAll({
            where: { role: 'student' },
            attributes: { exclude: ['password'] }
        });
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all clerks (Admin only)
export const getAllClerks = async (req, res) => {
    try {
        const clerks = await Student.findAll({
            where: { role: 'clerk' },
            attributes: { exclude: ['password'] }
        });
        res.json(clerks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
