import nodemailer from 'nodemailer';
import { ZOHO } from '../src/zohoClient';

/**
 * The function generates a confirmation link using the provided token and sends a confirmation email to the specified email address.
 * On success, it responds with a 200 status code indicating that the confirmation email was sent successfully.
 * If an error occurs during the sending process, it logs the error and responds with a 500 status code.
 *
 * @param req - The HTTP request object containing the email and token in the body.
 * @param res - The HTTP response object used to send back the appropriate response.
 */

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { email, token } = req.body;

    const confirmationLink = `https://sapphire-designs.net/confirmed?token=${token}`;

    // Create a Nodemailer transporter for Zoho Mail
    const transporter = nodemailer.createTransport({
        host: 'smtp.zoho.com', // Zoho SMTP server
        port: 465, // SSL port
        secure: true,
        auth: {
            user: ZOHO.EMAIL,
            pass: ZOHO.PASS,
        },
    });

    try {
        await transporter.sendMail({
            from: ZOHO.EMAIL, // Sender address
            to: email, // Recipient address
            subject: 'Confirm Your Subscription',
            html: `
                <h2>Confirm Your Subscription to Sapphire Designs newsletter</h2>
                <p>Click the link below to confirm:</p>
                <a href="${confirmationLink}" style="color: #0084FF; font-weight: bold;">Confirm Subscription</a>
                <p>If you did not request this, please ignore this email.</p>
            `,
        });

        res.status(200).json({ message: 'Confirmation email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send confirmation email' });
    }
}
