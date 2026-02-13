import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({ title: "", category: "", ingredients: "", instructions: "" });

  useEffect(() => {
    const fetchRecipe = async () => {
      const { data } = await axios.get(`http://localhost:4000/recipes/${id}`);
      if (data.success) setRecipe({ ...data.recipe, ingredients: data.recipe.ingredients.join(", ") });
    };
    fetchRecipe();
  }, [id]);

  const handleChange = e => setRecipe({ ...recipe, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:4000/recipes/${id}`,
        { ...recipe, ingredients: recipe.ingredients.split(",").map(i => i.trim()) },
        { withCredentials: true }
      );
      if (data.success) {
        toast.success("Recipe updated!");
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Server error");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Title" value={recipe.title} onChange={handleChange} />
      <input name="category" placeholder="Category" value={recipe.category} onChange={handleChange} />
      <textarea name="ingredients" placeholder="Ingredients (comma separated)" value={recipe.ingredients} onChange={handleChange} />
      <textarea name="instructions" placeholder="Instructions" value={recipe.instructions} onChange={handleChange} />
      <button type="submit">Update Recipe</button>
    </form>
  );
};

export default EditRecipe;
