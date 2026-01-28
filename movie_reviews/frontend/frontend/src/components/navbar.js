import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ user, logout }) => {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <Link to="/movies" className="navbar-brand">
        Movie Reviews
      </Link>

      <div className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to="/movies" className="nav-link">
            Movies
          </Link>
        </li>
      </div>

      <div className="navbar-nav ml-auto">
        {user ? (
          <li className="nav-item">
            <button
              className="nav-link btn btn-link"
              onClick={logout}
              style={{ color: "white", textDecoration: "none" }}
            >
              Logout {user.name}
            </button>
          </li>
        ) : (
          <li className="nav-item">
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </li>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
