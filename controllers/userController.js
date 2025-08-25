import { z } from 'zod';
import Student from '../models/student.js';
import csv from 'csv-parser';
import fs from 'fs';
import bcrypt from 'bcryptjs';
import xlsx from 'xlsx';

// Student data validation schema
const bulkStudentSchema = z.object({
    name: z.string().min(1, "Name is required").transform(val => val?.trim()),
    email: z.string().email("Invalid email address").transform(val => val?.trim().toLowerCase()),
    batch: z.union([
        z.string().regex(/^\d{4}$/, "Batch must be a 4-digit year").transform(Number),
        z.number().int().min(2000).max(new Date().getFullYear() + 1)
    ]),
    password: z.string().optional()
});

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

// Validate and process student data
const processStudentData = async (data) => {
    // Validate required fields
    if (!data.name || !data.email || !data.batch) {
        throw new Error('Name, email, and batch are required fields');
    }

    // Convert batch to number and validate
    const batch = Number(data.batch);
    if (isNaN(batch)) {
        throw new Error('Batch must be a valid number');
    }

    const currentYear = new Date().getFullYear();
    if (batch < 2000 || batch > currentYear + 1) {
        throw new Error(`Batch year must be between 2000 and ${currentYear + 1}`);
    }

    // Generate password hash
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password || 'changeme123', salt);

    return {
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        batch: batch,
        password: hashedPassword,
        role: 'student'
    };
};

// Bulk create students (Admin only)
export const bulkCreateStudents = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "Please upload a CSV or Excel file" });
    }

    let results = [];
    const errors = [];
    let totalRows = 0;

    try {
        if (req.file.mimetype === 'text/csv') {
            // Process CSV file
            await new Promise((resolve, reject) => {
                fs.createReadStream(req.file.path)
                    .pipe(csv())
                    .on('data', async (data) => {
                        totalRows++;
                        try {
                            const processedData = await processStudentData(data);
                            results.push(processedData);
                        } catch (error) {
                            errors.push({ row: data, error: error.message });
                        }
                    })
                    .on('end', resolve)
                    .on('error', reject);
            });
        } else {
            // Process Excel file
            const workbook = xlsx.readFile(req.file.path);
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            
            // Convert Excel data to JSON with specific options
            const excelData = xlsx.utils.sheet_to_json(sheet, {
                raw: false, // Convert all cells to strings
                defval: '', // Default value for empty cells
                blankrows: false, // Skip blank rows
            });

            if (excelData.length === 0) {
                throw new Error('Excel file is empty or has no valid data');
            }

            totalRows = excelData.length;
            console.log('First row data:', excelData[0]);

            // Process each row
            for (let i = 0; i < excelData.length; i++) {
                const row = excelData[i];
                try {
                    // Map Excel data to our format, trying various possible column names
                    const data = {
                        name: row.name || row.NAME || row.Name || '',
                        email: row.email || row.EMAIL || row.Email || '',
                        batch: row.batch || row.BATCH || row.Batch || '',
                        password: row.password || row.PASSWORD || row.Password
                    };

                    const processedData = await processStudentData(data, i + 2); // i + 2 for Excel row number (header + 1-based)
                    results.push(processedData);
                } catch (error) {
                    errors.push({ 
                        rowNumber: i + 2,
                        data: {
                            name: row.name || row.NAME || row.Name,
                            email: row.email || row.EMAIL || row.Email,
                            batch: row.batch || row.BATCH || row.Batch
                        },
                        error: error.message 
                    });
                    console.error(`Error processing row ${i + 2}:`, error.message);
                }
            }
        }

        // Create students in bulk
        if (results.length === 0) {
            return res.status(400).json({
                message: "No valid records to insert",
                errors: errors
            });
        }

        try {
            // Check for duplicate emails first
            const emails = results.map(r => r.email);
            const existingStudents = await Student.findAll({
                where: { email: emails },
                attributes: ['email']
            });

            if (existingStudents.length > 0) {
                const existingEmails = existingStudents.map(s => s.email);
                // Add duplicate email errors
                results.forEach((data, index) => {
                    if (existingEmails.includes(data.email)) {
                        errors.push({
                            rowNumber: index + 2, // +2 for Excel row number (header + 1-based)
                            data: {
                                name: data.name,
                                email: data.email,
                                batch: data.batch
                            },
                            error: `Email ${data.email} already exists in the database`
                        });
                    }
                });

                // Filter out records with duplicate emails
                const uniqueResults = results.filter(r => !existingEmails.includes(r.email));
                
                if (uniqueResults.length === 0) {
                    return res.status(400).json({
                        message: "All provided emails already exist in the database",
                        errors: errors
                    });
                }

                // Continue with unique records
                results = uniqueResults;
            }

            // Attempt to create all valid records
            await Student.bulkCreate(results, {
                validate: true,
                individualHooks: true
            });
            
            // Clean up uploaded file
            fs.unlinkSync(req.file.path);

            // Log processing results
            console.log('Total rows processed:', totalRows);
            console.log('Successful entries:', results.length);
            console.log('Failed entries:', errors.length);
        } catch (dbError) {
            // Handle any other database errors
            console.error('Database error:', dbError);
            return res.status(400).json({
                message: "Error creating students",
                error: dbError.message,
                errors: errors
            });
        }

        // Send response
        res.json({
            message: `Processed ${totalRows} rows: ${results.length} successful, ${errors.length} failed`,
            created: results.length,
            failed: errors.length,
            errors: errors.length ? errors : undefined,
            students: results.map(({ password, ...student }) => student) // Remove passwords from response
        });
    } catch (error) {
        // Clean up file in case of error
        if (fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        res.status(400).json({
            message: "Error creating students",
            error: error.message,
            failedRows: errors
        });
    }
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
