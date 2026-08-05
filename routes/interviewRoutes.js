const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { startInterview, getInterviews, getInterviewById, getDashboardStats } = require("../controllers/interviewController");

router.post("/", auth, startInterview);
router.get("/", auth, getInterviews);
router.get("/stats", auth, getDashboardStats)
router.get("/:id", auth, getInterviewById);

module.exports = router;