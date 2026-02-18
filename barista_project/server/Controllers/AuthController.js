const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const createToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

module.exports.Signup = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username)
      return res.status(400).json({ success: false, message: "All fields are required" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(409).json({ success: false, message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ email, username, password: hashedPassword });

    const token = createToken(user._id);

    // ✅ Set cookie properly
    res.cookie("token", token, {
      httpOnly: true,      // cannot be accessed by JS
      secure: false,       // must be false for localhost
      sameSite: "lax",     // allows cross-origin requests from frontend
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(201).json({ success: true, user: { id: user._id, email, username } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ success: false, message: "All fields required" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ success: false, message: "Invalid credentials" });

    const auth = await bcrypt.compare(password, user.password);
    if (!auth)
      return res.status(401).json({ success: false, message: "Invalid credentials" });

    const token = createToken(user._id);

    // ✅ Set cookie properly
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({ success: true, user: { id: user._id, username: user.username } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports.Logout = (req, res) => {
  res.clearCookie("token", { httpOnly: true, sameSite: "lax" });
  res.json({ success: true, message: "Logged out successfully" });
};
