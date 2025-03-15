import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Secure Supabase setup (Use Service Role Key for Admin Actions)
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SERVICE_ROLE_KEY);

// ✅ Nodemailer setup
const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ Fetch all user emails and send emails
app.post("/send-newsletter", async (req, res) => {
  const { title, content } = req.body;
  const date = new Date().toLocaleDateString();

  try {
    // ✅ Fetch all emails from Supabase Auth Users (Requires Admin Access)
    const { data, error } = await supabase.auth.admin.listUsers();
    if (error) throw error;

    const emails = data.users.map(user => user.email).filter(Boolean);
    if (emails.length === 0) return res.status(400).send("No users found!");

    // ✅ Email configuration
    const mailOptions = {
      from: `"Sapphire Designs" <${process.env.EMAIL_USER}>`,
      to: emails.join(","), // Join emails into a single string
      subject: `${title} - ${date}`,
      html: content, // HTML body content
    };

    // ✅ Send email
    await transporter.sendMail(mailOptions);
    res.send("✅ Newsletter sent to all users!");
  } catch (err) {
    console.error("❌ Error sending emails:", err);
    res.status(500).send("Failed to send emails.");
  }
});

// ✅ Start server
const PORT = 3001;
app.listen(PORT, () => console.log(`🚀 Email server running on port ${PORT}`));
