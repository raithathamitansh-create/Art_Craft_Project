const db = require("../db");

const User = {
    create: async (userData) => {
        const { first_name, last_name, email, mobile, password } = userData;
        const sql = "INSERT INTO users (first_name, last_name, email, mobile, password) VALUES (?, ?, ?, ?, ?)";
        const [result] = await db.execute(sql, [first_name, last_name, email, mobile, password]);
        return result;
    },

    findByEmail: async (email) => {
        const sql = "SELECT * FROM users WHERE email = ?";
        const [rows] = await db.execute(sql, [email]);
        return rows[0];
    }
};

module.exports = User;
