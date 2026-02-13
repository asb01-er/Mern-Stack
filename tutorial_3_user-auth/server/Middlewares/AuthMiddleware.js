const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");

module.exports.userVerification = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json({ status: false });

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) return res.json({ status: false });

      const user = await User.findById(decoded.id).select("username email _id");
      if (!user) return res.json({ status: false });

      return res.json({ status: true, user: { id: user._id, username: user.username } });
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: "Server error" });
  }
};
