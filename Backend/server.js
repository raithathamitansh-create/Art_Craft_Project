require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const enrollmentRoutes = require("./routes/enrollment");
const verifyToken = require("./middleware/authmiddleware");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/enrollments", enrollmentRoutes);

app.get("/api/protected", verifyToken, (req, res) => {
    res.json({ message: "You are authorized", user: req.user });
});

// Health check
app.get("/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date() });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
