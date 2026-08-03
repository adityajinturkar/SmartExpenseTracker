const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 30000,
});

// Welcome Email
const sendWelcomeEmail = async (name, email) => {
  try {
    const info = await transporter.sendMail({
      from: `"SmartExpenseAI" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "🎉 Welcome to SmartExpenseAI",
      html: `
        <h2>Hello ${name} 👋</h2>

        <p>Your account has been created successfully.</p>

        <p>Thank you for joining SmartExpenseAI.</p>
      `,
    });

    console.log("Accepted:", info.accepted);
    console.log("Rejected:", info.rejected);
    console.log("Response:", info.response);
    console.log("Message ID:", info.messageId);
  } catch (err) {
    console.error("Email Error:", err);
    throw err;
  }
};

// Reset Password Email
const sendResetPasswordEmail = async (email, resetURL) => {
  try {
    const info = await transporter.sendMail({
      from: `"SmartExpenseAI" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset Your Password",
      html: `
        <h2>Password Reset Request</h2>

        <p>You requested to reset your password.</p>

        <a href="${resetURL}">
          Reset Password
        </a>

        <p>This link expires in 15 minutes.</p>

        <p>If you didn't request this, ignore this email.</p>
      `,
    });

    console.log("Accepted:", info.accepted);
    console.log("Rejected:", info.rejected);
    console.log("Response:", info.response);
    console.log("Message ID:", info.messageId);
  } catch (err) {
    console.error("Email Error:", err);
    throw err;
  }
};

module.exports = {
  sendWelcomeEmail,
  sendResetPasswordEmail,
};