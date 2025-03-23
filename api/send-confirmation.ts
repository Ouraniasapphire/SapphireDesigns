import nodemailer from 'nodemailer';


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
            user: process.env.ZOHO_EMAIL,
            pass: process.env.ZOHO_PASS,
        },
    });

    try {
        await transporter.sendMail({
            from: process.env.ZOHO_EMAIL, // Sender address
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
