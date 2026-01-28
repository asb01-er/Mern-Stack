import React, { useState } from "react";
import { Routes, Route } from "react-router-dom"; // no BrowserRouter here
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar";
import MoviesList from "./components/movies-list";
import Movie from "./components/movie";
import Login from "./components/login";
import AddReview from "./components/add-review";

function App() {
  const [user, setUser] = useState(null);

  const login = (user = null) => setUser(user);

  return (
    <>
      <Navbar user={user} />

      <Routes>
        <Route path="/" element={<MoviesList user={user} />} />
        <Route path="/movies" element={<MoviesList user={user} />} />
        <Route path="/movies/:id" element={<Movie user={user} />} />
        <Route path="/movies/:id/review" element={<AddReview user={user} />} />
        <Route path="/login" element={<Login login={login} />} />
      </Routes>
    </>
  );
}

export default App;
