const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { submitAnswer } = require("../controllers/responseController");

router.post("/", auth, submitAnswer);

module.exports = router;