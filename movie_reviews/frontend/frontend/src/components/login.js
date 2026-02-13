// ==================== CHAPTER 23: BASIC LOGIN SYSTEM ====================
// Simple login form that stores user info in App state.
// This is not real authentication — just local user tracking.

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Login = (props) => {

  // Local state for username and user ID
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  // React Router v6 navigation
  const navigate = useNavigate();

  // Validate input → update App user state → redirect home
  const handleLogin = () => {
    if (!name || !id)
      return alert("Please enter both username and ID");

    props.login({ name, id }); // Lift user to App.js
    navigate("/"); // Redirect after login
  };

  return (
    <div className="mt-4">
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>User ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" onClick={handleLogin}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Login;
