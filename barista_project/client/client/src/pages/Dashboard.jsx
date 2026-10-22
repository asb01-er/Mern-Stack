import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Header from "../components/Header";
import "react-toastify/dist/ReactToastify.css";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [user, setUser] = useState(null);

  const handleError = (msg) =>
    toast.error(msg, { position: "bottom-left" });

  // Check whether the user is logged in
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/auth/verify",
          { withCredentials: true }
        );

        if (data.success) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        setUser(null);
        console.log("User not logged in");
      }
    };

    // Fetch recipes
    const fetchRecipes = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/recipes",
          { withCredentials: true }
        );

        if (data.success) {
          setRecipes(data.recipes);
        } else {
          handleError(data.message || "Failed to fetch recipes");
        }
      } catch (err) {
        handleError(
          err.response?.data?.message || "Server error"
        );
      }
    };

    verifyUser();
    fetchRecipes();
  }, []);

  // Handle recipe-card clicks
  const handleRecipeClick = () => {
    if (!user) {
      navigate("/login");
    }
  };

  // Delete a recipe
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) {
      return;
    }

    try {
      const { data } = await axios.delete(
        `http://localhost:4000/recipes/${id}`,
        { withCredentials: true }
      );

      if (data.success) {
        toast.success("Recipe deleted!");

        setRecipes((prev) =>
          prev.filter((recipe) => recipe._id !== id)
        );
      } else {
        handleError(data.message || "Failed to delete recipe");
      }
    } catch (err) {
      handleError(
        err.response?.data?.message || "Server error"
      );
    }
  };

  return (
    <div className="page_container">
      <Header />

      <div className="dashboard_container">
        <div className="dashboard_header">
          <h2>Recipe Dashboard</h2>

          {user && (
            <button
              onClick={() => navigate("/add")}
              className="add_button"
            >
              Add New Recipe
            </button>
          )}
        </div>

        {recipes.length === 0 ? (
          <p className="no_recipes">No recipes found.</p>
        ) : (
          <div className="recipe_grid">
            {recipes.map((recipe) => (
              <div
                key={recipe._id}
                className="recipe_card"
                onClick={handleRecipeClick}
                onKeyDown={(e) => {
                  if (
                    !user &&
                    (e.key === "Enter" || e.key === " ")
                  ) {
                    e.preventDefault();
                    navigate("/login");
                  }
                }}
                role={!user ? "button" : undefined}
                tabIndex={!user ? 0 : undefined}
                style={{
                  cursor: !user ? "pointer" : "default",
                }}
                title={
                  !user
                    ? "Log in or sign up to continue"
                    : ""
                }
              >
                {user && (
                  <div className="card_buttons">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/edit/${recipe._id}`);
                      }}
                      className="edit_button"
                    >
                      Edit
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(recipe._id);
                      }}
                      className="delete_button"
                    >
                      Delete
                    </button>
                  </div>
                )}

                <h3>{recipe.title}</h3>

                <p>
                  <strong>Category:</strong> {recipe.category}
                </p>

                <p>
                  <strong>Ingredients:</strong>{" "}
                  {Array.isArray(recipe.ingredients)
                    ? recipe.ingredients.join(", ")
                    : recipe.ingredients}
                </p>

                <p>
                  <strong>Instructions:</strong>{" "}
                  {recipe.instructions}
                </p>

                <p className="author">
                  <em>
                    Author: {recipe.author?.username || "Unknown"}
                  </em>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default Dashboard;
