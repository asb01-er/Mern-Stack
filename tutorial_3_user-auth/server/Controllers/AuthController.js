const User = require("../Models/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

module.exports = {
  Signup: async (req, res) => {
    try {
      const { email, username, password } = req.body;

      if (!email || !username || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
      }

      // Password will be hashed automatically by pre-save hook
      const user = await User.create({ email, username, password });

      const token = createSecretToken(user._id);

      res.cookie("token", token, {
        httpOnly: true,
        secure: false, // true in production
        sameSite: "lax",
      });

      return res.status(201).json({
        message: "User signed up successfully",
        success: true,
        user: { id: user._id, email: user.email, username: user.username },
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }
  },

  Login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Incorrect email or password" });
      }

      const auth = await bcrypt.compare(password, user.password);
      if (!auth) {
        return res.status(401).json({ message: "Incorrect email or password" });
      }

      const token = createSecretToken(user._id);

      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      });

      return res.status(200).json({
        message: "User logged in successfully",
        success: true,
        user: { id: user._id, email: user.email, username: user.username },
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }
  },
};
