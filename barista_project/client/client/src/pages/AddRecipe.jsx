// src/pages/AddRecipe.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddRecipe = () => {
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    title: "",
    category: "",
    ingredients: "",
    instructions: "",
  });

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/recipes",
        {
          ...recipe,
          ingredients: recipe.ingredients.split(",").map((i) => i.trim()),
        },
        { withCredentials: true } // send auth cookie
      );

      if (data.success) {
        toast.success("Recipe added successfully!");
        navigate("/"); // back to dashboard
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Server error");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Add Recipe</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" value={recipe.title} onChange={handleChange} required />
        <input name="category" placeholder="Category" value={recipe.category} onChange={handleChange} required />
        <textarea
          name="ingredients"
          placeholder="Ingredients (comma separated)"
          value={recipe.ingredients}
          onChange={handleChange}
          required
        />
        <textarea
          name="instructions"
          placeholder="Instructions"
          value={recipe.instructions}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
};

export default AddRecipe;
