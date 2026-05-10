const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

const verifyToken = require("./middleware/authmiddleware");

app.get("/api/protected", verifyToken, (req, res) => {
    res.json({ message: "You are authorized", user: req.user });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});

