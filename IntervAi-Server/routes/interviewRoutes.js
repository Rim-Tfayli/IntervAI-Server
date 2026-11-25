const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { startInterview, getInterviews, getInterviewById, getDashboardStats, deleteInterview } = require("../controllers/interviewController");

router.post("/", auth, startInterview);
router.get("/", auth, getInterviews);
router.get("/stats", auth, getDashboardStats)
router.get("/:id", auth, getInterviewById);
router.delete("/:id", auth, deleteInterview);

module.exports = router;