const router = require("express").Router();
const Recipe = require("../Models/RecipeModel");
const { userVerification } = require("../Middlewares/AuthMiddleware");

// ----------------------
// Create Recipe
// ----------------------
router.post("/", userVerification, async (req, res) => {
  try {
    const { title, category, ingredients, instructions } = req.body;
    if (!title || !category || !ingredients || !instructions) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

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

// ----------------------
// Get All Recipes
// ----------------------
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ createdAt: -1 }).populate("author", "username");
    res.json({ success: true, recipes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ----------------------
// Get Single Recipe
// ----------------------
router.get("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate("author", "username");
    if (!recipe) return res.status(404).json({ success: false, message: "Recipe not found" });
    res.json({ success: true, recipe });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ----------------------
// Update Recipe
// ----------------------
router.put("/:id", userVerification, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ success: false, message: "Recipe not found" });

    // Only author can update
    if (recipe.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    const { title, category, ingredients, instructions } = req.body;
    recipe.title = title;
    recipe.category = category;
    recipe.ingredients = ingredients;
    recipe.instructions = instructions;

    await recipe.save();
    res.json({ success: true, recipe });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ----------------------
// Delete Recipe
// ----------------------
router.delete("/:id", userVerification, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ success: false, message: "Recipe not found" });

    // Only author can delete
    if (recipe.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    await recipe.deleteOne();
    res.json({ success: true, message: "Recipe deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
