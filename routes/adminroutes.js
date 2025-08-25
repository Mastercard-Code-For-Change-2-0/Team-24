import express from 'express';
import { sendStudentEmails } from '../controllers/admincontroller.js';

const router = express.Router();

router.post("/send-emails", async (req, res) => {
    try {
        const { students } = req.body;
        if (!students || !Array.isArray(students)) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid input: students array is required" 
            });
        }

        const result = await sendStudentEmails(students);
        
        if (result.success) {
            res.json(result);
        } else {
            res.status(400).json(result);
        }
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Server error while sending emails",
            error: error.message 
        });
    }
});

export default router;