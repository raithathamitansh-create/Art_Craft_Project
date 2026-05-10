const db = require("../db");

const Enrollment = {
    create: async (userId, courseName, planTier) => {
        const sql = "INSERT INTO enrollments (user_id, course_name, plan_tier) VALUES (?, ?, ?)";
        const [result] = await db.execute(sql, [userId, courseName, planTier]);
        return result;
    },

    findByUser: async (userId) => {
        const sql = "SELECT * FROM enrollments WHERE user_id = ?";
        const [rows] = await db.execute(sql, [userId]);
        return rows;
    }
};

module.exports = Enrollment;
