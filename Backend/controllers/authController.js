const db = require("../db");
const bcrypt = require("bcrypt");

// SIGNUP
exports.registerUser = async (req, res) => {
    const { first_name, last_name, email, mobile, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = "INSERT INTO users (first_name, last_name, email, mobile, password) VALUES (?, ?, ?, ?, ?)";

        db.query(sql, [first_name, last_name, email, mobile, hashedPassword], (err, result) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.json({ message: "Signup successful" });
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// LOGIN
exports.loginUser = (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], async (err, result) => {
        if (err) return res.status(500).json({ error: err });

        if (result.length === 0) {
            return res.status(401).json({ message: "User not found" });
        }

        const user = result[0];

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({ message: "Wrong password" });
        }

        res.json({ message: "Login successful", user });
    });
};

const jwt = require("jsonwebtoken");

exports.loginUser = (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], async (err, result) => {
        if (err) return res.status(500).json({ error: err });

        if (result.length === 0) {
            return res.status(401).json({ message: "User not found" });
        }

        const user = result[0];

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({ message: "Wrong password" });
        }

        // 🔥 CREATE TOKEN
        const token = jwt.sign(
            { id: user.id, email: user.email },
            "secretkey123",
            { expiresIn: "1h" }
        );

        res.json({
            message: "Login successful",
            token: token
        });
    });
};