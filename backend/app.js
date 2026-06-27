const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const cropRoutes = require("./routes/cropRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "AI Crop Disease Detection Backend is Running 🚀"
  });
});

// API Routes
app.use("/api/crops", cropRoutes);

// Error Handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});