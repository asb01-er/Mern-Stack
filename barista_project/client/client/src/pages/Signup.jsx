import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Header from "../components/Header";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:4000/auth/signup",
        input,
        { withCredentials: true }
      );

      if (data.success) {
        toast.success("Account created!");

        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        toast.error(data.message || "Signup failed");
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Server error"
      );
    }
  };

  return (
    <div className="page_container">
      <Header />

      <div className="form_container">
        <h2>Signup</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              name="username"
              placeholder="Enter your username"
              value={input.username}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={input.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Create a password"
              value={input.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Create Account</button>

          <span>
            Already have an account?{" "}
            <Link to="/login">Login</Link>
          </span>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Signup;