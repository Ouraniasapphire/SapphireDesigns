import nodemailer from 'nodemailer';

/**
 * Handles the sending of emails using Nodemailer and Zoho Mail.
 * 
 * This function is an HTTP POST endpoint that expects a request body with the following properties:
 * - `title`: Subject of the email.
 * - `htmlContent`: HTML content to be included in the email.
 * - `recipients`: Array of email addresses to send the email to.
 * 
 * If the request method is not POST, it responds with a 405 status code.
 * 
 * The function creates a Nodemailer transporter configured for Zoho Mail and sends the email to each recipient specified.
 * On success, it responds with a 200 status code indicating that emails were sent successfully.
 * If an error occurs during the sending process, it logs the error and responds with a 500 status code.
 * 
 * @param req - The HTTP request object containing the email details in the body.
 * @param res - The HTTP response object used to send back the appropriate response.
 */

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
