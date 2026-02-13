const router = require("express").Router();
const Recipe = require("../Models/RecipeModel");
const { userVerification } = require("../Middlewares/AuthMiddleware");

router.post("/", userVerification, async (req, res) => {
  try {
    const { title, ingredients, instructions, category } = req.body;
    if (!title || !ingredients || !instructions || !category)
      return res.status(400).json({ success: false, message: "All fields are required" });

    const recipe = await Recipe.create({
      title,
      category,
      ingredients,
      instructions,
      author: req.user._id,
    });

    res.status(201).json({ success: true, recipe });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/", async (req, res) => {
  const recipes = await Recipe.find().sort({ createdAt: -1 }).populate("author", "username");
  res.json({ success: true, recipes });
});

module.exports = router;
