import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/auth/verify", {
          withCredentials: true,
        });
        if (data.status) setUser(data.user);
      } catch {}
    };

    const fetchRecipes = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/recipes", { withCredentials: true });
        if (data.success) setRecipes(data.recipes);
      } catch {}
    };

    fetchUser();
    fetchRecipes();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Dashboard</h1>

      {user ? (
        <p>Welcome, {user.username}</p>
      ) : (
        <p>Please <Link to="/login">Login</Link> to add recipes</p>
      )}

      {user && (
        <Link to="/add">
          <button>Add Recipe</button>
        </Link>
      )}

      <h2>All Recipes</h2>
      {recipes.length === 0 ? (
        <p>No recipes yet</p>
      ) : (
        recipes.map((r) => (
          <div key={r._id} style={{ border: "1px solid #ccc", margin: "1rem 0", padding: "1rem" }}>
            <h3>
              {r.title} ({r.category})
            </h3>
            <p><strong>Ingredients:</strong> {r.ingredients.join(", ")}</p>
            <p><strong>Instructions:</strong> {r.instructions}</p>
            <p><strong>Author:</strong> {r.author.username}</p>
            {user && user.id === r.author._id && (
              <Link to={`/edit/${r._id}`}><button>Edit</button></Link>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Dashboard;
