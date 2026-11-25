const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/protected-test", auth, (req, res) => {
    res.json({ message: `You are logged in as user ${req.user.id}` });
});

module.exports = router;