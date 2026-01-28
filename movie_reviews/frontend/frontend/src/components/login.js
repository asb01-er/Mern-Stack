import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- import useNavigate
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Login = (props) => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const navigate = useNavigate(); // <-- hook for navigation

  // Handle login
  const handleLogin = () => {
    if (!name || !id) return alert("Please enter both username and ID");

    // Update user in App.js
    props.login({ name, id });

    // Navigate to home page
    navigate("/"); // replaces props.history.push('/')
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
          <Form.Label>ID</Form.Label>
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
