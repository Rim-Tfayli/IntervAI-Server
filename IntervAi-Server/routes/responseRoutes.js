const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { submitAnswer, toggleFavorite, getFavorites } = require("../controllers/responseController");

router.post("/", auth, submitAnswer);
router.patch("/:id/favorite", auth, toggleFavorite);
router.get("/favorites", auth, getFavorites);

module.exports = router;