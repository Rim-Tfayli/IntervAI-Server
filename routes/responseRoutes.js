const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { submitAnswer, toggleFavorite } = require("../controllers/responseController");

router.post("/", auth, submitAnswer);
router.patch("/:id/favorite", auth, toggleFavorite);

module.exports = router;