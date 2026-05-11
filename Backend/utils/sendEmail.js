const { Resend } = require("resend");

// Ensure RESEND_API_KEY is available
const resend = new Resend(process.env.RESEND_API_KEY);

async function sendOTPEmail(userEmail, otp) {
    try {
        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: userEmail,
            subject: "Your Art & Craft Login OTP",
            html: `
                <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
                    <h2>Welcome back to Art & Craft!</h2>
                    <p>Use the following OTP to complete your login securely:</p>
                    <h1 style="font-size: 40px; color: #4f46e5; letter-spacing: 5px;">${otp}</h1>
                    <p>This code will expire in 5 minutes.</p>
                </div>
            `
        });
        console.log("OTP email sent successfully");
    } catch (error) {
        console.error("Email error:", error);
        throw error;
    }
}

module.exports = { sendOTPEmail };
