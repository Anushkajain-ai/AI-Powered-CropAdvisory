const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { body } = require("express-validator");

const {
  register,
  login,
} = require("../controllers/authController");

const router = express.Router();

// =========================
// Register
// =========================

router.post(
  "/register",
  [
    body("name")
      .notEmpty()
      .withMessage("Name is required"),

    body("email")
      .isEmail()
      .withMessage("Enter a valid email"),

    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  register
);

// =========================
// Login
// =========================

router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Enter a valid email"),

    body("password")
      .notEmpty()
      .withMessage("Password is required"),
  ],
  login
);

// =========================
// Google OAuth Login
// =========================

router.get(
  "/google",
  passport.authenticate("google", {
  scope: ["profile", "email"],
  prompt: "select_account",
})
);

// =========================
// Google OAuth Callback
// =========================

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: true,
  }),
  (req, res) => {
    const token = jwt.sign(
      {
        id: req.user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.redirect(
      `${process.env.FRONTEND_URL}/login?token=${token}`
    );
  }
);

module.exports = router;