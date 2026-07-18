const express = require("express");

const { analyzeDisease } = require("../controllers/aiController");

const router = express.Router();

router.post("/analyze", analyzeDisease);

module.exports = router;