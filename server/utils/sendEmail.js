const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

// Welcome Email
const sendWelcomeEmail = async (name, email) => {
  try {
    await resend.emails.send({
      from: "SmartExpenseAI <onboarding@resend.dev>",
      to: email,
      subject: "🎉 Welcome to SmartExpenseAI",
      html: `
        <h2>Hello ${name} 👋</h2>

        <p>Your account has been created successfully.</p>

        <p>Thank you for joining SmartExpenseAI.</p>
      `,
    });

    console.log("✅ Welcome email sent");
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Reset Password Email
const sendResetPasswordEmail = async (email, resetURL) => {
  try {
    await resend.emails.send({
      from: "SmartExpenseAI <onboarding@resend.dev>",
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

    console.log("✅ Reset email sent");
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = {
  sendWelcomeEmail,
  sendResetPasswordEmail,
};