import nodemailer from "nodemailer";
import dotenv from 'dotenv';
dotenv.config();


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_URI,
    pass: process.env.MAIL_PASSWORD,
  },
});

export const sendAlertEmail = async (personName, status) => {
  try {
    const info = await transporter.sendMail({
      from: '"Crimo Finder Alert" <crimefinder@email.com>',
      to: "yuvrajsankilwar2004@gmail.com",
      subject: `🚨 Alert: ${personName} flagged as ${status}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e2e2e2; border-radius: 10px; background-color: #f9f9f9;">
          <div style="text-align: center;">
            <h2 style="color: #d9534f;">🚨 Criminal Alert Notification</h2>
            <p style="color: #555;">This alert was triggered from <strong>Crimo Finder</strong></p>
          </div>

          <hr style="margin: 20px 0;" />

          <div style="font-size: 16px; color: #333;">
            <p><strong>Name:</strong> ${personName}</p>
            <p><strong>Status:</strong> <span style="color: ${status === "Criminal Record Detected" ? "#d9534f" : "#5cb85c"};">${status}</span></p>
          </div>

          <div style="margin-top: 30px;">
            <p style="font-size: 14px; color: #888;">This is an automated message sent from the Crimo Finder system for monitoring and analysis purposes. Do not reply to this email.</p>
          </div>
        </div>
      `,
    });

    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Email failed:", error);
  }
};


