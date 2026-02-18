import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Header from "../components/Header";

const AddRecipe = () => {
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    title: "",
    category: "",
    ingredients: "",
    instructions: "",
  });

  const handleChange = (e) => setRecipe({ ...recipe, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/recipes",
        { ...recipe, ingredients: recipe.ingredients.split(",").map(i => i.trim()) },
        { withCredentials: true }
      );
      if (data.success) {
        toast.success("Recipe added successfully!");
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="page_container">
      <Header />
      <div className="form_container">
        <h2>Add Recipe</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title</label>
            <input name="title" value={recipe.title} onChange={handleChange} placeholder="Recipe Title" required />
          </div>
          <div>
            <label>Category</label>
            <input name="category" value={recipe.category} onChange={handleChange} placeholder="Category" required />
          </div>
          <div>
            <label>Ingredients (comma separated)</label>
            <textarea name="ingredients" value={recipe.ingredients} onChange={handleChange} placeholder="Ingredients" required />
          </div>
          <div>
            <label>Instructions</label>
            <textarea name="instructions" value={recipe.instructions} onChange={handleChange} placeholder="Instructions" required />
          </div>
          <button type="submit">Add Recipe</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddRecipe;
