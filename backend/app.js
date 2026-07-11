const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");
const session = require("express-session");
const passport = require("passport");

dotenv.config();

require("./config/passport");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

const cropRoutes = require("./routes/cropRoutes");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// =========================
// Rate Limiter
// =========================

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    message: "Too many login/register attempts. Please try again later.",
  },
});

// Home Route

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "AI Crop Disease Detection Backend is Running 🚀",
  });
});

// =========================
// API Routes
// =========================

app.use("/api/crops", cropRoutes);

app.use("/api/auth", authLimiter, authRoutes);

// Error Handling Middleware

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});