const express = require("express");

const {
  getAllCrops,
  getCropById,
  addCrop,
  updateCrop,
  deleteCrop,
  searchCrop
} = require("../controllers/cropController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Search
router.get("/search", searchCrop);

// CRUD Routes
router.get("/", protect, getAllCrops);

router.get("/:id", getCropById);

router.post("/", addCrop);

router.put("/:id", updateCrop);

router.delete("/:id", deleteCrop);

module.exports = router;