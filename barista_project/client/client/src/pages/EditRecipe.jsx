import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Header from "../components/Header";
import "react-toastify/dist/ReactToastify.css";

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    title: "",
    category: "",
    ingredients: "",
    instructions: "",
  });

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const { data } = await axios.get(`http://localhost:4000/recipes/${id}`, { withCredentials: true });
        if (data.success) {
          setRecipe({ ...data.recipe, ingredients: data.recipe.ingredients.join(", ") });
        } else {
          toast.error(data.message || "Failed to fetch recipe");
        }
      } catch (err) {
        toast.error(err.response?.data?.message || "Server error");
      }
    };
    fetchRecipe();
  }, [id]);

  const handleChange = (e) => setRecipe({ ...recipe, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:4000/recipes/${id}`,
        { ...recipe, ingredients: recipe.ingredients.split(",").map((i) => i.trim()) },
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
    <div className="page_container">
      <Header />
      <div className="form_container">
        <h2>Edit Recipe</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title</label>
            <input name="title" value={recipe.title} onChange={handleChange} placeholder="Title" required />
          </div>
          <div>
            <label>Category</label>
            <input name="category" value={recipe.category} onChange={handleChange} placeholder="Category" required />
          </div>
          <div>
            <label>Ingredients (comma separated)</label>
            <textarea
              name="ingredients"
              value={recipe.ingredients}
              onChange={handleChange}
              placeholder="Ingredients"
              required
            />
          </div>
          <div>
            <label>Instructions</label>
            <textarea
              name="instructions"
              value={recipe.instructions}
              onChange={handleChange}
              placeholder="Instructions"
              required
            />
          </div>
          <button type="submit">Update Recipe</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditRecipe;
