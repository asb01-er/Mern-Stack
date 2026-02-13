import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    username: "",
    password: "",
  });
  const { email, username, password } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleError = (err) =>
    toast.error(err, { position: "bottom-left" });
  const handleSuccess = (msg) =>
    toast.success(msg, { position: "bottom-left" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !username || !password) {
      return handleError("All fields are required");
    }

    try {
      const { data } = await axios.post(
        "http://localhost:4000/signup",
        { email, username, password },
        { withCredentials: true }
      );

      if (data.success) {
        handleSuccess(data.message);
        setTimeout(() => navigate("/"), 1000);
      } else {
        handleError(data.message);
      }
    } catch (err) {
      // Handle 409 Conflict or other errors
      if (err.response && err.response.data && err.response.data.message) {
        handleError(err.response.data.message);
      } else {
        handleError("Server error. Try again.");
      }
    }

    setInputValue({ email: "", username: "", password: "" });
  };

  return (
    <div className="form_container">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Enter your username"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleOnChange}
          />
        </div>
        <button type="submit">Signup</button>
        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
