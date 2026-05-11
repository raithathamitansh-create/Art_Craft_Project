const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// SIGNUP
exports.registerUser = async (req, res) => {
    const { first_name, last_name, email, mobile, password } = req.body;

    if (!email || !password || !first_name) {
        return res.status(400).json({ message: "Please provide all required fields" });
    }

    try {
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ first_name, last_name, email, mobile, password: hashedPassword });

        res.status(201).json({ message: "Signup successful" });
    } catch (err) {
        console.error("Signup error:", err);
        res.status(500).json({ error: "An error occurred during signup" });
    }
};

const db = require("../db");
const { generateOTP, hashOTP } = require("../utils/otp");
const { sendOTPEmail } = require("../utils/sendEmail");

// LOGIN
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate OTP
        const otp = generateOTP();
        const hashedOtp = hashOTP(otp);
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

        // Clear old OTPs for this user
        await db.query("DELETE FROM otp_codes WHERE user_id = ?", [user.id]);

        // Insert new OTP
        await db.query("INSERT INTO otp_codes (user_id, otp, expires_at) VALUES (?, ?, ?)", [user.id, hashedOtp, expiresAt]);

        // Send Email
        await sendOTPEmail(user.email, otp);

        res.json({ message: "OTP sent" });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ error: "An error occurred during login" });
    }
};

// VERIFY OTP
exports.verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ message: "Email and OTP are required" });
    }

    try {
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const [rows] = await db.query("SELECT * FROM otp_codes WHERE user_id = ? ORDER BY id DESC LIMIT 1", [user.id]);
        if (rows.length === 0) {
            return res.status(400).json({ message: "No OTP request found" });
        }

        const otpRecord = rows[0];
        const now = new Date();

        if (now > new Date(otpRecord.expires_at)) {
            return res.status(400).json({ message: "OTP has expired" });
        }

        const hashedInputOtp = hashOTP(otp);
        if (hashedInputOtp !== otpRecord.otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        // OTP is valid - Issue JWT
        await db.query("DELETE FROM otp_codes WHERE user_id = ?", [user.id]); // Clean up

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET || "default_secret",
            { expiresIn: "1h" }
        );

        res.json({
            message: "Login successful",
            token: token,
            user: {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email
            }
        });
    } catch (err) {
        console.error("OTP Verification error:", err);
        res.status(500).json({ error: "An error occurred during verification" });
    }
};