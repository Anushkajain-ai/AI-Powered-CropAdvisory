const Crop = require("../models/Crop");

// GET ALL CROPS
const getAllCrops = async (req, res) => {
  try {
    const data = await Crop.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET SINGLE CROP
const getCropById = async (req, res) => {
  try {
    const data = await Crop.findById(req.params.id);

    if (!data) {
      return res.status(404).json({ message: "Crop not found" });
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE CROP
const addCrop = async (req, res) => {
  try {
    const newCrop = await Crop.create(req.body);
    res.status(201).json(newCrop);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE CROP
const updateCrop = async (req, res) => {
  try {
    const updated = await Crop.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Crop not found" });
    }

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE CROP
const deleteCrop = async (req, res) => {
  try {
    const deleted = await Crop.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Crop not found" });
    }

    res.status(200).json({ message: "Crop deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// SEARCH CROP
const searchCrop = async (req, res) => {
  try {
    const keyword = req.query.crop || "";

    const result = await Crop.find({
      crop: { $regex: keyword, $options: "i" }
    });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllCrops,
  getCropById,
  addCrop,
  updateCrop,
  deleteCrop,
  searchCrop
};