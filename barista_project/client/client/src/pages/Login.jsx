import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({ email: "", password: "" });

  const handleChange = e => setInput({ ...input, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:4000/auth/login", input, { withCredentials: true });
      if (data.success) {
        toast.success("Logged in!");
        navigate("/");
      } else toast.error(data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Server error");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" value={input.email} onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" value={input.password} onChange={handleChange} />
        <button type="submit">Login</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
