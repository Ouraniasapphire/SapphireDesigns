import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";

export default async (req, res) => {
  if (req.method === "POST") {
    const { title, content } = req.body;
    const date = new Date().toLocaleDateString();

    try {
      // ✅ Secure Supabase setup (Use Service Role Key for Admin Actions)
      const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

      // ✅ Fetch all emails from Supabase Auth Users (Requires Admin Access)
      const { data, error } = await supabase.auth.admin.listUsers();
      if (error) throw error;

      const emails = data.users.map(user => user.email).filter(Boolean);
      if (emails.length === 0) return res.status(400).send("No users found!");

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

      // ✅ Email configuration
      const mailOptions = {
        from: `"Sapphire Designs" <${process.env.EMAIL_USER}>`,
        to: emails.join(","), // Join emails into a single string
        subject: `${title} - ${date}`,
        html: content, // HTML body content
      };

      // ✅ Send email
      await transporter.sendMail(mailOptions);
      return res.status(200).send("✅ Newsletter sent to all users!");
    } catch (err) {
      console.error("❌ Error sending emails:", err);
      return res.status(500).send("Failed to send emails.");
    }
  } else {
    return res.status(405).send("Method Not Allowed");
  }
};
