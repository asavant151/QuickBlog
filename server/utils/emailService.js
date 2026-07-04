import nodemailer from 'nodemailer';

const createTransporter = () => {
    // We expect the user to set these in their .env file
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.warn("Email credentials not found in .env. Emails will not be sent.");
        return null;
    }

    return nodemailer.createTransport({
        service: 'gmail', // or configured host
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
};

export const sendEmail = async (to, subject, text, html) => {
    const transporter = createTransporter();
    if (!transporter) return false;

    try {
        const info = await transporter.sendMail({
            from: `"QuickBlog" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
            html
        });
        console.log("Message sent: %s", info.messageId);
        return true;
    } catch (error) {
        console.error("Error sending email:", error);
        return false;
    }
};
