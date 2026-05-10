const Enrollment = require("../models/enrollmentModel");

exports.enrollInCourse = async (req, res) => {
    const { courseName, planTier } = req.body;
    const userId = req.user.id; // From verifyToken middleware

    if (!courseName || !planTier) {
        return res.status(400).json({ message: "Course name and plan tier are required" });
    }

    try {
        await Enrollment.create(userId, courseName, planTier);
        res.status(201).json({ message: `Successfully enrolled in ${courseName} (${planTier} plan)` });
    } catch (err) {
        console.error("Enrollment error:", err);
        res.status(500).json({ error: "Failed to enroll in course" });
    }
};

exports.getMyEnrollments = async (req, res) => {
    const userId = req.user.id;

    try {
        const enrollments = await Enrollment.findByUser(userId);
        res.json(enrollments);
    } catch (err) {
        console.error("Fetch enrollments error:", err);
        res.status(500).json({ error: "Failed to fetch enrollments" });
    }
};
