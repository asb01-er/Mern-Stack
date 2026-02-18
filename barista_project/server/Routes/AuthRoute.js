const router = require("express").Router();
const { Signup, Login, Logout } = require("../Controllers/AuthController");
const { userVerification } = require("../Middlewares/AuthMiddleware");

router.post("/signup", Signup);
router.post("/login", Login);
router.get("/verify", userVerification, (req, res) => {
  res.json({ success: true, user: { id: req.user._id, username: req.user.username } });
});
router.post("/logout", Logout);


module.exports = router;
