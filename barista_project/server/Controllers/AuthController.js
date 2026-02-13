const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const createToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

module.exports.Signup = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username)
      return res.status(400).json({ success: false, message: "All fields are required" });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ success: false, message: "User already exists" });

    const user = await User.create({ email, username, password });

    const token = createToken(user._id);
    res.cookie("token", token, { httpOnly: true, sameSite: "lax" });

    res.status(201).json({ success: true, user: { id: user._id, email, username } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, message: "All fields required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ success: false, message: "Invalid credentials" });

    const auth = await bcrypt.compare(password, user.password);
    if (!auth) return res.status(401).json({ success: false, message: "Invalid credentials" });

    const token = createToken(user._id);
    res.cookie("token", token, { httpOnly: true, sameSite: "lax" });

    res.json({ success: true, user: { id: user._id, username: user.username } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
