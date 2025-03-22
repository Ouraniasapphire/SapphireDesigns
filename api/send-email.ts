import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { title, htmlContent, recipients } = req.body;

    // Create a Nodemailer transporter for Zoho Mail
    const transporter = nodemailer.createTransport({
        host: 'smtp.zoho.com', // Zoho SMTP server
        port: 465, // SSL port
        secure: true, // Use SSL
        auth: {
            user: process.env.ZOHO_EMAIL,
            pass: process.env.ZOHO_PASS,
        },
    });

    try {
        // Send email to each recipient
        for (const recipient of recipients) {
            await transporter.sendMail({
                from: `${process.env.ZOHO_EMAIL}`,
                to: recipient, 
                subject: title, 
                html: htmlContent, 
            });
        }

        res.status(200).json({ message: 'Emails sent successfully' });
    } catch (error) {
        console.error('Error sending emails:', error);
        res.status(500).json({ message: 'Failed to send emails' });
    }
}
