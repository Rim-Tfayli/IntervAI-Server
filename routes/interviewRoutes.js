const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { startInterview } = require("../controllers/interviewController");

router.post("/", auth, startInterview);

module.exports = router;