import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

// Function to generate random passwords
function generatePassword(length = 8) {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$!";
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

// ✅ Correct ESM import way for Nodemailer
const transporter = nodemailer.default
  ? nodemailer.default.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })
  : nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

/**
 * Function to send registration emails to students
 * @param {Array<{name: string, email: string}>} students - Array of student objects containing name and email
 * @returns {Promise<{success: boolean, message: string, errors?: Array<{email: string, error: string}>}>}
 */
export async function sendStudentEmails(students) {
  if (!students || !Array.isArray(students) || students.length === 0) {
    return { success: false, message: "No students provided" };
  }

  const errors = [];
  try {
    for (let student of students) {
      if (!student.email || !student.name) {
        errors.push({ email: student.email || 'unknown', error: 'Missing required fields (name or email)' });
        continue;
      }
      const password = generatePassword();

      await transporter.sendMail({
        from: `"Admin" <${process.env.EMAIL_USER}>`,
        to: student.email,
        subject: 'Your Registration Details',
        text: `Hello ${student.name},\n\nYour account has been created.\nEmail: ${student.email}\nPassword: ${password}\n\nPlease login and change your password.`,
      });

      console.log(`✅ Email sent to ${student.email}`);
    }

    if (errors.length > 0) {
      return {
        success: false,
        message: "Some emails failed to send",
        errors
      };
    }

    return {
      success: true,
      message: "✅ All emails sent successfully"
    };
  } catch (error) {
    console.error("❌ Error sending emails:", error);
    return {
      success: false,
      message: "Failed to send emails",
      errors: [{ email: 'all', error: error.message }]
    };
  }
}