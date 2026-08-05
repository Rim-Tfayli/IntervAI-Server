const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { startInterview, getInterviews, getInterviewById } = require("../controllers/interviewController");

router.post("/", auth, startInterview);
router.get("/", auth, getInterviews);
router.get("/:id", auth, getInterviewById);

module.exports = router;