const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel");

const userVerification = async (req, res, next) => {
  const token = req.cookies.token; // get token from cookie
  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { userVerification };
