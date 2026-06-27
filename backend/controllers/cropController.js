const crops = require("../data/crops");

// GET all crops
const getAllCrops = (req, res) => {
  res.status(200).json(crops);
};

// GET single crop
const getCropById = (req, res) => {
  const crop = crops.find(c => c.id === parseInt(req.params.id));

  if (!crop) {
    return res.status(404).json({
      message: "Crop not found"
    });
  }

  res.status(200).json(crop);
};

// POST new crop
const addCrop = (req, res) => {
  const { crop, disease, advice } = req.body;

  const newCrop = {
    id: crops.length + 1,
    crop,
    disease,
    advice
  };

  crops.push(newCrop);

  res.status(201).json(newCrop);
};

// PUT update crop
const updateCrop = (req, res) => {
  const id = parseInt(req.params.id);

  const existing = crops.find(c => c.id === id);

  if (!existing) {
    return res.status(404).json({
      message: "Crop not found"
    });
  }

  existing.crop = req.body.crop;
  existing.disease = req.body.disease;
  existing.advice = req.body.advice;

  res.status(200).json(existing);
};

// DELETE crop
const deleteCrop = (req, res) => {
  const id = parseInt(req.params.id);

  const index = crops.findIndex(c => c.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Crop not found"
    });
  }

  crops.splice(index, 1);

  res.status(200).json({
    message: "Crop deleted successfully"
  });
};

// SEARCH crop
const searchCrop = (req, res) => {
  const keyword = req.query.crop?.toLowerCase();

  const result = crops.filter(c =>
    c.crop.toLowerCase().includes(keyword)
  );

  res.status(200).json(result);
};

module.exports = {
  getAllCrops,
  getCropById,
  addCrop,
  updateCrop,
  deleteCrop,
  searchCrop
};