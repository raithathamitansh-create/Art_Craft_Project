const express = require("express");
const router = express.Router();
const { enrollInCourse, getMyEnrollments } = require("../controllers/enrollmentController");
const verifyToken = require("../middleware/authmiddleware");

// All enrollment routes are protected
router.post("/enroll", verifyToken, enrollInCourse);
router.get("/my-enrollments", verifyToken, getMyEnrollments);

module.exports = router;
