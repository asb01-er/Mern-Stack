import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Header from "../components/Header";

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({ email: "", password: "" });

  const handleChange = (e) => setInputValue({ ...inputValue, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:4000/auth/login", inputValue, { withCredentials: true });
      if (data.success) {
        toast.success("Login successful!");
        navigate("/");
      } else toast.error(data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="page_container">
      <Header />
      <div className="form_container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <input type="email" name="email" value={inputValue.email} onChange={handleChange} placeholder="Email" required />
          </div>
          <div>
            <label>Password</label>
            <input type="password" name="password" value={inputValue.password} onChange={handleChange} placeholder="Password" required />
          </div>
          <button type="submit">Login</button>
          <span>Don't have an account? <Link to="/signup">Signup</Link></span>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
