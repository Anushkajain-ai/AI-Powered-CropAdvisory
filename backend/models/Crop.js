const mongoose = require("mongoose");

const cropSchema = new mongoose.Schema({
  crop: String,
  disease: String,
  description: String,
  cause: [String],
  symptoms: [String],
  control: [String],
  chemical: [String],
  prevention: [String]
});

module.exports = mongoose.model("Crop", cropSchema);