const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const router = express.Router();
const User = require("../models/user");

// SIGNUP
router.post(
  "/signup",
  [
    check("email", "Please input a valid email").isEmail(),
    check(
      "password",
      "Please input a password with a min length of 6"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const { email, password } = req.body;

    // Validate the inputs
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }

    // Validate if the user doesnt already exist;
    const user = await User.findOne({ where: { email } });

    if (user) {
      return res.status(422).json({
        errors: [
          {
            msg: "This user already exists",
          },
        ],
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword,
    });

    const token = await JWT.sign({ email }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_ExpiresIn,
    });

    res.json({
      email: email,
      token,
    });
  }
);

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Check if user with email exists
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(422).json({
      errors: [
        {
          msg: "Invalid Credentials",
        },
      ],
    });
  }

  // Check if the password if valid
  let isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(404).json({
      errors: [
        {
          msg: "Invalid Credentials",
        },
      ],
    });
  }

  // Send JSON WEB TOKEN
  const token = await JWT.sign({ email }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_ExpiresIn,
  });

  res.json({
    token,
  });
});
module.exports = router;
